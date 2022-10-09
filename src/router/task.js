const express = require("express");
const Task = require("../models/task");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    const response = await task.save();
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  // console.log("match", match);
  try {
    const tasks = await User.findById(req.user._id)
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .exec();
    if (tasks.tasks.length === 0) return res.status(404).send([]);
    res.send(tasks.tasks);
  } catch (error) {
    res.status(404).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const { id: _id } = req.params;
  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send({});
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isAllowed = updates.every((update) => allowedUpdates.includes(update));
  if (!isAllowed) return res.status(400).send("Updates not allowed");

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(400).send("No Task Found");
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    const savedTask = await task.save();
    res.send(savedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(400).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
