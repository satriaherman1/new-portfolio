import { useState, useEffect } from "react";
import { FaThumbsUp, FaRegThumbsUp, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import Button from "./Button";
import LikeAnimation from "./LikeAnimation";

interface Comment {
    id: string;
    name: string;
    message: string;
    date: string;
}

interface InteractionData {
    likes: number;
    comments: Comment[];
    isLiked: boolean; // localized to user browser
}

interface CommentSectionProps {
    projectId: string;
}

export default function CommentSection({ projectId }: CommentSectionProps) {
    const STORAGE_KEY = `portfolio_interaction_${projectId}`;

    const [data, setData] = useState<InteractionData>({
        likes: 0,
        comments: [],
        isLiked: false,
    });

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);

    // Load data from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setData(JSON.parse(stored));
        } else {
            // Initialize random likes for demo feel if empty
            const initialLikes = Math.floor(Math.random() * 50) + 10;
            const initialData = { likes: initialLikes, comments: [], isLiked: false };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
            setData(initialData);
        }
    }, [projectId, STORAGE_KEY]);

    const handleLike = () => {
        const newData = { ...data };
        if (data.isLiked) {
            newData.likes -= 1;
            newData.isLiked = false;
        } else {
            newData.likes += 1;
            newData.isLiked = true;
            setShowLikeAnimation(true); // Trigger animation
        }
        setData(newData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            name,
            message,
            date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
        };

        const newData = {
            ...data,
            comments: [newComment, ...data.comments],
        };

        setData(newData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        setMessage(""); // Keep name for convenience
    };

    return (
        <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 relative">
            {/* Animation Overlay */}
            <LikeAnimation
                isVisible={showLikeAnimation}
                onComplete={() => setShowLikeAnimation(false)}
            />

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Discussion</h2>
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${data.isLiked
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-blue-300"
                        }`}
                >
                    {data.isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                    <span className="font-semibold">{data.likes} Likes</span>
                </button>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-10 space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Share your thoughts..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <Button variant="primary" icon={<FaPaperPlane />}>
                        Post Comment
                    </Button>
                </div>
            </form>

            {/* Comment List */}
            <div className="space-y-6">
                {data.comments.length === 0 ? (
                    <p className="text-center text-neutral-500 dark:text-neutral-400 py-4">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                    data.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="shrink-0">
                                <FaUserCircle className="w-10 h-10 text-neutral-300 dark:text-neutral-600" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-neutral-900 dark:text-white">{comment.name}</h4>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-500">{comment.date}</span>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{comment.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
