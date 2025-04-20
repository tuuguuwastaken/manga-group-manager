import { RootState } from "../states.ts"
import { createAction, createReducer } from "@reduxjs/toolkit"

export interface formEditState {
  isEdit: boolean
}


const initialState: formEditState = {
  isEdit: false,
}

export const selectFormEditState = (state: RootState): formEditState => state.formEdit

export const formEditStarted = createAction("FORM_EDIT_STARTED");
export const formEditFinished = createAction("FORM_EDIT_FINISHED");

const formEditReducer = createReducer(initialState, (builder) => {
  builder.addCase(formEditStarted, (state) => {
    Object.assign(state, {isEdit: true})
  })
  builder.addCase(formEditFinished, (state) => {
    Object.assign(state, {isEdit: false})
  })
})

export default formEditReducer