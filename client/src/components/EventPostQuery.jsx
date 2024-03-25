import { useState } from 'react';

export const EventPostQuery = ({ event }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/events/add-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId: event._id, 
                    comments: query,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit query');
            }

            // Reset the query state 
            setQuery('');
        } catch (error) {
            console.error('Error submitting query:', error);
        }
    };

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    // Check if event data is available before rendering
    if (!event) {
        return null; // Don't render anything if event data is empty
    }

    return (
        <div className="PostQueriesAll">
            <div className='PostQueries1'>
                <h2>Don't see the answers you are looking for? Post your question</h2>
                <p>Queries might be answered by the host, speakers, or the Socials Team</p>
                <form className="Query" onSubmit={handleSubmit}> {/* Update to handle form submission */}
                    <textarea
                        className="text-box"
                        rows="4"
                        cols="50"
                        placeholder="Enter your question here"
                        value={query}
                        onChange={handleQueryChange}
                        required
                    />
                    <button type="submit" className="SubmitComment">Submit</button> {/* Change button type to submit */}
                </form>
            </div>
            <div className='PostQueries2'>
                <h2>Comments</h2>
                <div className="Info">
                    {event.comments && event.comments.map((info, index) => (
                        <div className = "EachInfo" key={index}>
                            {info}
                            <div className='CommentButtons'>
                                <button className='Upvote'>Upvote</button>
                                <button className='Report'>Report</button>
                                <button className='Reply'>Reply</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventPostQuery;
