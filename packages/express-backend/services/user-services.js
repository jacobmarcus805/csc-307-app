import mongoose from "mongoose";
import userModel from "../models/user.js";

mongoose.set("debug", true);


  export function getUsers(name, job) {
    if (!name && !job) {
      return userModel.find();
    }
    if (name && job) {
      return userModel.find({ name: name, job: job });
    }
    if (name) {
      return userModel.find({ name: name });
    }
    return userModel.find({ job: job });
  }

export function findUserById(id) {
  return userModel.findById(id);
}

export function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

export function findUserByName(name) {
  return userModel.find({ name: name });
}

export function findUserByJob(job) {
  return userModel.find({ job: job });
}

export function updateUserById(id, updates) {
  return userModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  });
}

export function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

