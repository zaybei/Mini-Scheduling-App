import { useState } from 'react';
import './Composer.css';
import { postToFacebookPage, schedulePost } from '../services/facebookService';

const Composer = ({ user, connectedPages }) => {
    const [selectedPages, setSelectedPages] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [isScheduled, setIsScheduled] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    const handlePageToggle = (pageId) => {
        setSelectedPages(prev =>
            prev.includes(pageId)
                ? prev.filter(id => id !== pageId)
                : [...prev, pageId]
        );
    };

    const handlePost = async () => {
        if (!postContent.trim()) {
            alert('Please enter some content for your post');
            return;
        }

        if (selectedPages.length === 0) {
            alert('Please select at least one page to post to');
            return;
        }

        setIsPosting(true);

        try {
            const promises = selectedPages.map(pageId => {
                const page = connectedPages.find(p => p.id === pageId);

                if (isScheduled && scheduleDate && scheduleTime) {
                    const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
                    return schedulePost(pageId, page.access_token, postContent, scheduledDateTime, imageUrl || null);
                } else {
                    return postToFacebookPage(pageId, page.access_token, postContent, imageUrl || null);
                }
            });

            await Promise.all(promises);

            alert(`Post ${isScheduled ? 'scheduled' : 'published'} successfully!`);

            // Reset form
            setPostContent('');
            setImageUrl('');
            setScheduleDate('');
            setScheduleTime('');
            setSelectedPages([]);
        } catch (error) {
            console.error('Error posting:', error);
            alert('Failed to post. Please try again.');
        } finally {
            setIsPosting(false);
        }
    };

    const characterCount = postContent.length;
    const maxCharacters = 5000;

    return (
        <div className="composer">
            <div className="composer-header">
                <h1 className="composer-title">Create New Post</h1>
                <p className="composer-subtitle">
                    Craft your message and share it across your Facebook pages
                </p>
            </div>

            <div className="composer-layout">
                <div className="composer-main">
                    <div className="composer-card">
                        <div className="composer-section">
                            <label className="composer-label">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Post Content
                            </label>
                            <textarea
                                className="input textarea composer-textarea"
                                placeholder="What's on your mind?"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                                maxLength={maxCharacters}
                            />
                            <div className="character-count">
                                <span className={characterCount > maxCharacters * 0.9 ? 'warning' : ''}>
                                    {characterCount} / {maxCharacters}
                                </span>
                            </div>
                        </div>

                        <div className="composer-section">
                            <label className="composer-label">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                                Image URL (Optional)
                            </label>
                            <input
                                type="url"
                                className="input"
                                placeholder="https://example.com/image.jpg"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                            {imageUrl && (
                                <div className="image-preview">
                                    <img src={imageUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                                </div>
                            )}
                        </div>

                        <div className="composer-section">
                            <div className="schedule-toggle">
                                <label className="toggle-label">
                                    <input
                                        type="checkbox"
                                        checked={isScheduled}
                                        onChange={(e) => setIsScheduled(e.target.checked)}
                                        className="toggle-input"
                                    />
                                    <span className="toggle-slider"></span>
                                    <span className="toggle-text">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 0 0-1 1v1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1V3a1 1 0 1 0-2 0v1H7V3a1 1 0 0 0-1-1zm0 5a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H6z" clipRule="evenodd" />
                                        </svg>
                                        Schedule for later
                                    </span>
                                </label>
                            </div>

                            {isScheduled && (
                                <div className="schedule-inputs">
                                    <div className="input-group">
                                        <label className="input-label">Date</label>
                                        <input
                                            type="date"
                                            className="input"
                                            value={scheduleDate}
                                            onChange={(e) => setScheduleDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Time</label>
                                        <input
                                            type="time"
                                            className="input"
                                            value={scheduleTime}
                                            onChange={(e) => setScheduleTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="composer-sidebar">
                    <div className="composer-card">
                        <h3 className="sidebar-title">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 9a7 7 0 1 1 14 0H3z" />
                            </svg>
                            Select Pages
                        </h3>

                        {connectedPages.length === 0 ? (
                            <div className="empty-pages">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="24" cy="24" r="20" />
                                    <path d="M24 16v8m0 4h.01" strokeLinecap="round" />
                                </svg>
                                <p>No pages connected</p>
                                <span>Go to Settings to connect your Facebook pages</span>
                            </div>
                        ) : (
                            <div className="pages-list">
                                {connectedPages.map((page) => (
                                    <label key={page.id} className="page-item">
                                        <input
                                            type="checkbox"
                                            checked={selectedPages.includes(page.id)}
                                            onChange={() => handlePageToggle(page.id)}
                                            className="page-checkbox"
                                        />
                                        <div className="page-info">
                                            <span className="page-name">{page.name}</span>
                                            <span className="page-category">{page.category || 'Page'}</span>
                                        </div>
                                        <div className="page-check">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="btn btn-primary btn-lg composer-submit"
                        onClick={handlePost}
                        disabled={isPosting || !postContent.trim() || selectedPages.length === 0}
                    >
                        {isPosting ? (
                            <>
                                <div className="btn-spinner"></div>
                                {isScheduled ? 'Scheduling...' : 'Posting...'}
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 0 0-1.788 0l-7 14a1 1 0 0 0 1.169 1.409l5-1.429A1 1 0 0 0 9 15.571V11a1 1 0 1 1 2 0v4.571a1 1 0 0 0 .725.962l5 1.428a1 1 0 0 0 1.17-1.408l-7-14z" />
                                </svg>
                                {isScheduled ? 'Schedule Post' : 'Publish Now'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Composer;
