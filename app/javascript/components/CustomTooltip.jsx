import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './CustomTooltip.css';
import moment from 'moment';

const CustomTooltip = ({ event, children }) => {
    const [visible, setVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const showTooltip = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const tooltipWidth = 400; // Assuming max-width of 400px
        const tooltipHeight = 100; // Approximate height of the tooltip
        const gap = 50; // Gap between tooltip and edge of the screen

        let left = rect.left + window.scrollX + rect.width / 2;
        let top = rect.top + window.scrollY;

        // Adjust if tooltip goes off the right edge
        if (left + tooltipWidth / 2 > window.innerWidth - gap) {
            left = window.innerWidth - tooltipWidth / 2 - gap;
        }

        // Adjust if tooltip goes off the left edge
        if (left - tooltipWidth / 2 < gap) {
            left = tooltipWidth / 2 + gap;
        }

        // Adjust if tooltip goes off the bottom edge
        if (top + tooltipHeight > window.innerHeight - gap) {
            top = rect.top + window.scrollY - tooltipHeight - gap;
        }

        setTooltipPosition({ top, left });
        setVisible(true);
    };

    const hideTooltip = () => setVisible(false);

    return (
            <div
                className="custom-tooltip-wrapper"
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
            >
                {children}
                {visible && ReactDOM.createPortal(
                    <a className="text-white" href={`/events/${event.id}`}>
                        <div
                            className="custom-tooltip"
                            style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
                        >
                            <div className="tooltip-content">
                                <p><strong>{event.title}</strong></p>
                                <p>{event.description}</p>
                                <p>Start time: {moment(event.start).format('h:mm a')}</p>
                                {event.end.getTime() !== event.start.getTime() && (
                                    <p>End time: {moment(event.end).format('h:mm a')}</p>
                                )}
                                <p>Location: {event.location}</p>
                                {event.multi_day && <p>*This is a multi-day event</p>}
                            </div>
                        </div>
                    </a>,
                    document.body
                )}
            </div>
    );
};

export default CustomTooltip;