import {createAction} from '@reduxjs/toolkit';

export const USER_ACTIONS = {
  GET_USER: {
    COMPLETED: createAction<{name: string; role: string}>(
      '[Set User]: Completed',
    ),
  },
  UPDATE_USER: {
    TRIGGERED: createAction<{name: string; role: string}>(
      '[User Change Name]: Triggered',
    ),
    COMPLETED: createAction<{name: string; role: string}>(
      '[User Change Name]: Completed',
    ),
  },
};

export const PROJECT_ACTIONS = {
  GET_PROJECTS: {
    COMPLETED: createAction<
      Array<{
        id: string;
        taskIds: Array<string>;
        title: string;
        description: string;
      }>
    >('[Get Projects]: Completed'),
  },
  CREATE_PROJECT: {
    TRIGGERED: createAction('[CreateProject] Triggered'),
    COMPLETED: createAction<{
      id: string;
      title: string;
      description: string;
      taskIds: Array<string>;
    }>('[Create Project] Completed'),
  },
  UPDATE_PROJECT: {
    TRIGGERED: createAction<{
      projectId: string;
      projectName: string;
      projectDescription: string;
    }>('[Update Project] Triggered'),
    COMPLETED: createAction<{
      projectId: string;
      projectName: string;
      projectDescription: string;
    }>('[Update Project] Completed'),
  },
};

export const TASK_ACTIONS = {
  GET_TASKS: {
    COMPLETED: createAction<
      Map<
        string,
        {
          id: string;
          title: string;
          description: string;
          status: string;
        }
      >
    >('[Get Tasks]: Completed'),
  },
  SET_STATUS: {
    TRIGGERED: createAction<{taskId: string; status: string}>(
      '[Set Status]: Triggered',
    ),
    COMPLETED: createAction<{
      taskId: string;
      task: {
        id: string;
        title: string;
        description: string;
        status: string;
      };
    }>('[Set Status]: Completed'),
  },
  CREATE_TASK: {
    TRIGGERED: createAction<{projectId: string}>('[Create Task] Triggered'),
    COMPLETED: createAction<{
      task: {
        id: string;
        title: string;
        description: string;
        status: string;
      };
      projectId: string;
    }>('[Create Task] Completed'),
  },
  UPDATE_TASK: {
    TRIGGERED: createAction<{
      taskId: string;
      taskName: string;
      taskDescription: string;
    }>('[Update Task] Triggered'),
    COMPLETED: createAction<{
      taskId: string;
      taskName: string;
      taskDescription: string;
    }>('[Update Task] Completed'),
  },
};
