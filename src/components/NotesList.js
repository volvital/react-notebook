import { CSSTransition, TransitionGroup } from "react-transition-group"

export const NotesList = ({notes, onRemove}) => (
	<>
	{!notes.length ? <h3 className="text-center">No notes yet</h3> :
		<TransitionGroup component="ul" className="list-group">
		{
			notes.map(
			note => (
				<CSSTransition
					key={note.id}
					classNames={'note'}
					timeout={800}
				>
				<li className="list-group-item d-flex justify-content-between align-items-center bg-primary text-light">
					<div>
						<strong className="mr-1">{note.title}</strong>
						<br />
						<small>{note.date}</small>
					</div>
					<button 
						type="button" 
						className="btn btn-sm btn-close btn-danger"
						onClick={() => onRemove(note.id)}
						>
					</button>
				</li>
				</CSSTransition>
			)
		)}
		</TransitionGroup>}
	</>
	
)