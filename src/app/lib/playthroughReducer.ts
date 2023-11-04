import { Playthrough } from "@prisma/client";

export function playthroughReducer(state, action) {
  switch (action.type) {
    case "load":
      return action.data;
    case "add":
      return [...state, action.newPlaythrough];
    case "update": {
      const index = state.findIndex(
        (x: Playthrough) => x.id === action.updated.id,
      );
      if (index !== -1) {
        return state.toSpliced(index, 1, action.updated);
      } else {
        throw Error(`Could not find id [${action.updated.id}]`);
      }
    }
    default:
      throw Error(`Unknown action ${action.type}`);
  }
}
