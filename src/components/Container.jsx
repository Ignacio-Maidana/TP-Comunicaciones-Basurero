import React from 'react';

const Container = (container) => {
    return(
        <div className="containterCard">
            {
                container.map((item => (
                        <div>
                            
                        </div>
                    ))
                )
            }
        </div>
    );
}

export default Container;