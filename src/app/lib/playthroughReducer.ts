import { Playthrough } from "@prisma/client";

function formatPlaythrough(pt) {
  const fields: Record<string, Date | null | undefined> = {};
  if (pt.startedOn) {
    fields.startedOn = new Date(pt.startedOn);
  }
  if (pt.finishedOn) {
    fields.finishedOn = new Date(pt.finishedOn);
  }
  return Object.assign(pt, fields);
}

export function playthroughReducer(state, action) {
  switch (action.type) {
    case "load":
      return action.data.map((x) => {
        const fields: Record<string, Date | null | undefined> = {};
        if (x.startedOn) {
          fields.startedOn = new Date(x.startedOn);
        }
        if (x.finishedOn) {
          fields.finishedOn = new Date(x.finishedOn);
        }
        return Object.assign(x, fields);
      });
    case "add":
      return [...state, action.newPlaythrough];
    case "update": {
      const index = state.findIndex(
        (x: Playthrough) => x.id === action.updated.id,
      );
      if (index !== -1) {
        return state.toSpliced(index, 1, formatPlaythrough(action.updated));
      } else {
        throw Error(`Could not find id [${action.updated.id}]`);
      }
    }
    default:
      throw Error(`Unknown action ${action.type}`);
  }
}
