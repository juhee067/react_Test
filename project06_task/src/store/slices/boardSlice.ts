import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoardItem, ITask, Ilist } from '../types';

type IboardState = {
  modalActive: boolean;
  boardArray: IBoardItem[];
};

type TAddBoardAction = {
  board: IBoardItem;
};
type TAddListAction = {
  boardId: string;
  list: Ilist;
};
type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TDeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

type TDeleteListAction = {
  boardId: string;
  listId: string;
};
type TDeleteBoardAction = {
  boardId: string;
};

const initialState: IboardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫번째 게시물',
      lists: [
        {
          listId: 'list-0',
          listName: 'list 1',
          tasks: [
            {
              taskId: 'task-0',
              taskName: 'task 1',
              taskDescription: 'des1',
              taskOwner: 'John',
            },
            {
              taskId: 'task-1',
              taskName: 'task 2',
              taskDescription: 'des2',
              taskOwner: 'Johnson',
            },
          ],
        },
        {
          listId: 'list-1',
          listName: 'list 2',
          tasks: [
            {
              taskId: 'task-3',
              taskName: 'task',
              taskDescription: 'des3',
              taskOwner: 'John3',
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    // 보드를 추가하는 액션 정의
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    },
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter((board) => board.boardId !== payload.boardId);
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boardArray.map(
        (board) => board.boardId === payload.boardId && board.lists.push(payload.list)
      );
    },
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map(
                (list) => list.listId === payload.listId && list.tasks.push(payload.task)
              ),
            }
          : board
      );
    },
    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map((task) =>
                        task.taskId === payload.task.taskId ? payload.task : task
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter((task) => task.taskId !== payload.taskId),
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? { ...board, lists: board.lists.filter((list) => list.listId !== payload.listId) }
          : board
      );
    },

    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});

export const {
  addBoard,
  addList,
  addTask,
  deleteList,
  setModalActive,
  updateTask,
  deleteTask,
  deleteBoard,
} = boardSlice.actions;
export const boardsReducer = boardSlice.reducer;
