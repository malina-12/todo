import React from 'react';

const AddButton = ({onAddItem}) => {
        return (
            <div className="container__add">
                <button type='button' 
                    className="container__add-btn" 
                    onClick={onAddItem} >
                        <svg width="50" height="50">
						<circle cx="25" cy="25" r="25" fill="#f6a57d"/>
						<line strokeWidth="2" x1="15" x2="35" y1="25" y2="25" stroke="#fff"/>
						<line strokeWidth="2" x1="25" x2="25" y1="15" y2="35" stroke="#fff"/>
					</svg>
                </button>
            </div>
        )
}
export default AddButton