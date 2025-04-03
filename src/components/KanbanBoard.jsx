import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Cambia esto:
// export const KanbanBoard = ({ tasksByStatus, handleStatusChange }) => {

// Por esto (exportación por defecto):
const KanbanBoard = ({ tasksByStatus, handleStatusChange }) => {
  const onDragEnd = (result) => {
    const { source, destination } = result;
    
    if (!destination) return;

    handleStatusChange(
      result.draggableId,
      destination.droppableId.split('-')[1] 
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {Object.entries(tasksByStatus).map(([status, tasks], columnIndex) => (
          <Droppable key={status} droppableId={`column-${columnIndex}-${status}`}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="kanban-column"
                data-status={status}
              >
                <div className="kanban-column-header">{status}</div>
                <div className="kanban-tasks">
                  {tasks.map((task, taskIndex) => (
                    <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`kanban-task ${task.groupId ? 'group' : 'personal'}`}
                          onClick={() => console.log('Task clicked:', task.id)}
                        >
                          <span className={`task-badge ${task.groupId ? 'group' : 'personal'}`}>
                            {task.groupId ? 'Grupo' : 'Personal'}
                          </span>
                          <h4 className="task-title">{task.nameTask}</h4>
                          {task.description && <p className="task-description">{task.description}</p>}
                          {task.deadline && (
                            <div className="task-deadline">
                              📅 {new Date(task.deadline).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

// Añade esta línea al final:
export default KanbanBoard;