export interface Taskschema {
  id: number,
  body: string,
  priority: number,
  assignee: string,
  status: string,
}

export interface Taskpostschema {
  body: string,
  priority: number,
  assignee: string,
  status: string,
}
