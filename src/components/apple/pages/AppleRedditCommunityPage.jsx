import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  Trophy, 
  MessageSquare, 
  ArrowBigUp, 
  ArrowBigDown, 
  Share2, 
  Bookmark, 
  PlusCircle, 
  Image as ImageIcon, 
  Send, 
  Filter, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingBag, 
  TrendingUp, 
  Heart,
  Users,
  Zap,
  Clock,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../../audio/soundEffects';
import { formatPrice } from '../../../utils/pricing';

import { 
  getStoredCommunityPosts, 
  saveCommunityPosts, 
  triggerAIBatchNow, 
  getAutoPostingStatus 
} from '../../../services/communityStorage';

export default function AppleRedditCommunityPage({
  onNavigate,
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [activeTab, setActiveTab] = useState('hot'); // 'hot' | 'new' | 'top'
  const [selectedFlair, setSelectedFlair] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newFlair, setNewFlair] = useState('r/RoomSetups');
  const [newContent, setNewContent] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newAuthor, setNewAuthor] = useState('You (Verified Buyer)');

  // Feed Posts Data with Live Storage Sync
  const [posts, setPosts] = useState(getStoredCommunityPosts);

  useEffect(() => {
    const handleSync = () => {
      setPosts(getStoredCommunityPosts());
    };
    window.addEventListener('neocraft_community_updated', handleSync);
    return () => window.removeEventListener('neocraft_community_updated', handleSync);
  }, []);

  // Background Auto AI Post Interval (If enabled)
  useEffect(() => {
    if (!getAutoPostingStatus()) return;
    
    // Periodically generate 1 new post in background every 15-30 minutes of browsing
    const timer = setInterval(() => {
      if (getAutoPostingStatus()) {
        triggerAIBatchNow(1);
      }
    }, 1000 * 60 * 15); // 15 mins

    return () => clearInterval(timer);
  }, []);

  // Comment input state per post
  const [commentInputs, setCommentInputs] = useState({});

  const flairs = [
    'All',
    'r/RoomSetups',
    'r/CafeAndClubs',
    'r/DesignFeedback',
    'r/SpiritualArt',
    'r/DIYAndMounting',
    'r/Announcements'
  ];

  // Upvote / Downvote Handler
  const handleVote = (postId, direction) => {
    playClickSound();
    const updated = posts.map(p => {
      if (p.id !== postId) return p;
      let newVote = 0;
      let diff = 0;

      if (p.userVote === direction) {
        // Undo vote
        newVote = 0;
        diff = -direction;
      } else {
        // New vote
        newVote = direction;
        diff = direction - (p.userVote || 0);
      }

      return {
        ...p,
        userVote: newVote,
        upvotes: p.upvotes + diff
      };
    });
    setPosts(updated);
    saveCommunityPosts(updated);
  };

  // Add Comment to Post
  const handleAddComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    playChimeSound();
    const newComment = {
      id: `comment-${Date.now()}`,
      author: 'u/You (Community Member)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      timeAgo: 'Just now',
      text: text,
      upvotes: 1,
      isVerified: true
    };

    const updated = posts.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        commentsCount: (p.commentsCount || 0) + 1,
        comments: [newComment, ...(p.comments || [])]
      };
    });
    setPosts(updated);
    saveCommunityPosts(updated);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  // Create New Post Handler
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    playChimeSound();
    confetti({ particleCount: 50, spread: 60 });

    const createdPost = {
      id: `post-${Date.now()}`,
      subreddit: newFlair,
      author: newAuthor,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      timeAgo: 'Just now',
      isVerifiedBuyer: true,
      title: newTitle,
      content: newContent,
      imageUrl: newImageUrl || 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
      hashtags: ['#CustomNeon', '#NEOCRAFT', '#AestheticSetup'],
      upvotes: 1,
      userVote: 1,
      commentsCount: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };

    const updated = [createdPost, ...posts];
    setPosts(updated);
    saveCommunityPosts(updated);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewImageUrl('');
  };

  // Filtered Posts with Bulletproof Null-Safety
  const filteredPosts = (posts || [])
    .filter(p => selectedFlair === 'All' || p?.subreddit === selectedFlair)
    .filter(p => {
      if (!p) return false;
      const q = (searchQuery || '').toLowerCase().trim();
      if (!q) return true;
      const titleMatch = (p.title || '').toLowerCase().includes(q);
      const contentMatch = (p.content || '').toLowerCase().includes(q);
      const authorMatch = (p.author || '').toLowerCase().includes(q);
      const hashtagMatch = Array.isArray(p.hashtags) && p.hashtags.some(h => (h || '').toLowerCase().includes(q));
      return titleMatch || contentMatch || authorMatch || hashtagMatch;
    })
    .sort((a, b) => {
      if (activeTab === 'hot') return (b?.upvotes || 0) - (a?.upvotes || 0);
      if (activeTab === 'new') return 0;
      if (activeTab === 'top') return (b?.upvotes || 0) - (a?.upvotes || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-24 pb-20 font-sans selection:bg-[#2997ff]/30">
      
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <div className="relative rounded-[32px] overflow-hidden border border-[#222226] bg-gradient-to-r from-[#121218] via-[#1a1a24] to-[#0f0f15] p-6 sm:p-10 shadow-2xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#ff4500]/15 border border-[#ff4500]/30 text-[#ff4500] text-xs font-bold flex items-center gap-1.5 font-mono">
                  <Zap className="w-3.5 h-3.5 fill-[#ff4500]" />
                  <span>r/NEOCRAFT Community</span>
                </span>
                <span className="text-xs text-[#86868b] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <strong className="text-white">24.8k Members</strong> • 412 Online Now
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                The Illuminated Creators Hub.
              </h1>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                Showcase your neon gaming battlestations, cafe buildouts, ask for typography design feedback, and earn Neon Karma points!
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => { playClickSound(); setIsCreateModalOpen(true); }}
                className="apple-btn-primary px-5 py-3 text-xs font-bold cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-[#2997ff]/20 flex-1 md:flex-initial"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Post</span>
              </button>

              <button
                onClick={() => onNavigate('custom-studio')}
                className="apple-btn-secondary px-4 py-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5 flex-1 md:flex-initial"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
                <span>Design Sign</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: Feed + Right Sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Cols: Filter Bar + Feed */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Feed Filter & Search Bar */}
          <div className="p-3 rounded-2xl bg-[#121216] border border-[#222226] flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Sorting Tabs (Hot / New / Top) */}
            <div className="flex items-center gap-1 bg-[#0c0c0e] p-1 rounded-xl border border-[#222226]">
              <button
                onClick={() => { playClickSound(); setActiveTab('hot'); }}
                className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer flex items-center gap-1.5 transition-all ${
                  activeTab === 'hot' ? 'bg-[#ff4500] text-white shadow-md' : 'text-[#86868b] hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Hot</span>
              </button>

              <button
                onClick={() => { playClickSound(); setActiveTab('new'); }}
                className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer flex items-center gap-1.5 transition-all ${
                  activeTab === 'new' ? 'bg-[#2997ff] text-white shadow-md' : 'text-[#86868b] hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>New</span>
              </button>

              <button
                onClick={() => { playClickSound(); setActiveTab('top'); }}
                className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer flex items-center gap-1.5 transition-all ${
                  activeTab === 'top' ? 'bg-amber-500 text-black shadow-md' : 'text-[#86868b] hover:text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Top</span>
              </button>
            </div>

            {/* Flair Categories Pill Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {flairs.map((f) => (
                <button
                  key={f}
                  onClick={() => { playClickSound(); setSelectedFlair(f); }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    selectedFlair === f 
                      ? 'bg-white text-black font-bold' 
                      : 'bg-[#18181d] text-[#86868b] hover:text-white border border-[#26262a]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                className="rounded-3xl bg-[#121216] border border-[#222226] hover:border-[#333338] transition-all overflow-hidden flex flex-col sm:flex-row shadow-lg"
              >
                
                {/* Left: Reddit-style Vertical Upvote/Downvote Rail */}
                <div className="p-3 sm:py-4 sm:px-3 bg-[#0e0e12] border-b sm:border-b-0 sm:border-r border-[#222226] flex sm:flex-col items-center justify-between sm:justify-start gap-2 select-none">
                  
                  <button
                    onClick={() => handleVote(post.id, 1)}
                    className={`p-1.5 rounded-xl hover:bg-[#ff4500]/20 transition-colors cursor-pointer ${
                      post.userVote === 1 ? 'text-[#ff4500] font-bold' : 'text-[#86868b] hover:text-[#ff4500]'
                    }`}
                    title="Upvote"
                  >
                    <ArrowBigUp className="w-6 h-6" />
                  </button>

                  <span className={`text-xs font-bold font-mono ${
                    post.userVote === 1 ? 'text-[#ff4500]' : post.userVote === -1 ? 'text-[#7193ff]' : 'text-white'
                  }`}>
                    {post.upvotes}
                  </span>

                  <button
                    onClick={() => handleVote(post.id, -1)}
                    className={`p-1.5 rounded-xl hover:bg-[#7193ff]/20 transition-colors cursor-pointer ${
                      post.userVote === -1 ? 'text-[#7193ff] font-bold' : 'text-[#86868b] hover:text-[#7193ff]'
                    }`}
                    title="Downvote"
                  >
                    <ArrowBigDown className="w-6 h-6" />
                  </button>

                </div>

                {/* Right: Post Content Area */}
                <div className="p-5 flex-1 space-y-3">
                  
                  {/* Meta Bar: Subreddit, Author, Timestamp */}
                  <div className="flex items-center gap-2 text-xs text-[#86868b] flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-[#2997ff]/15 text-[#2997ff] text-[10px] font-bold">
                      {post.subreddit}
                    </span>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <img src={post.avatar} alt={post.author} className="w-4 h-4 rounded-full object-cover" />
                      <strong className="text-slate-200">{post.author}</strong>
                      {post.isVerifiedBuyer && (
                        <span className="inline-flex items-center gap-0.5 text-emerald-400 text-[10px] bg-emerald-400/10 px-1.5 py-0.2 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Buyer</span>
                        </span>
                      )}
                    </div>
                    <span>•</span>
                    <span className="text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.timeAgo}</span>
                    </span>
                  </div>

                  {/* Post Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {post.title}
                  </h3>

                  {/* Post Body Description */}
                  {post.content && (
                    <p className="text-xs sm:text-sm text-[#a1a1a6] leading-relaxed">
                      {post.content}
                    </p>
                  )}

                  {/* Post Image Media */}
                  {post.imageUrl && (
                    <div className="rounded-2xl overflow-hidden border border-[#2a2a30] max-h-[420px] bg-black">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300" 
                      />
                    </div>
                  )}

                  {/* Attached "Shop This Sign" Bento Bar */}
                  {post.linkedProduct && (
                    <div className="p-3 rounded-xl bg-[#17171d] border border-[#282830] flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="text-[10px] uppercase font-bold text-[#86868b]">Featured Product in Post:</div>
                        <div className="text-xs font-semibold text-white">{post.linkedProduct.name}</div>
                      </div>
                      <button
                        onClick={() => {
                          playChimeSound();
                          onAddToCart({
                            id: `comm-item-${post.id}`,
                            name: post.linkedProduct.name,
                            price: post.linkedProduct.price,
                            quantity: 1,
                            image: '✨'
                          });
                        }}
                        className="apple-btn-primary px-3 py-1.5 text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order ({formatPrice(post.linkedProduct.price, selectedCurrency)})</span>
                      </button>
                    </div>
                  )}

                  {/* Action Buttons: Comments, Share */}
                  <div className="pt-2 flex items-center gap-4 text-xs text-[#86868b] border-t border-[#1e1e24]">
                    <div className="flex items-center gap-1.5 text-white font-semibold">
                      <MessageSquare className="w-4 h-4 text-[#2997ff]" />
                      <span>{post.commentsCount} Comments</span>
                    </div>

                    <button 
                      onClick={() => {
                        playClickSound();
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(`https://neocraftx.com/community#${post.id}`);
                          alert('Post link copied to clipboard! 📋');
                        }
                      }}
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="pt-3 space-y-3">
                    
                    {/* Add Comment Input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                        placeholder="Write a comment..."
                        className="flex-1 px-3 py-2 bg-[#0c0c0e] border border-[#222226] rounded-xl text-xs text-white focus:outline-none focus:border-[#2997ff]"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-3 py-2 rounded-xl bg-[#2997ff] text-white hover:bg-[#1a82e2] cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Existing Comments List */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {post.comments.map((c) => (
                          <div key={c.id} className="p-3 rounded-xl bg-[#0e0e12] border border-[#1f1f25] text-xs space-y-1">
                            <div className="flex items-center gap-2 text-[#86868b]">
                              <img src={c.avatar} alt={c.author} className="w-3.5 h-3.5 rounded-full object-cover" />
                              <strong className="text-white text-[11px]">{c.author}</strong>
                              {c.isOP && (
                                <span className="text-[9px] bg-[#2997ff]/20 text-[#2997ff] px-1 rounded font-bold">OP</span>
                              )}
                              <span>•</span>
                              <span className="text-[10px]">{c.timeAgo}</span>
                            </div>
                            <p className="text-slate-300 text-xs pl-5 leading-relaxed">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right 4 Cols: Community Sidebar & Leaderboards */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* About r/NEOCRAFT Card */}
          <div className="p-6 rounded-3xl bg-[#121216] border border-[#222226] space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#2997ff]" />
              <h3 className="font-bold text-sm text-white">About the Community</h3>
            </div>

            <p className="text-xs text-[#86868b] leading-relaxed">
              India's largest community of architects, cafe owners, streamers, and interior designers customizing illuminated neon & canvas art.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-[#0c0c0e] border border-[#1f1f25]">
                <div className="text-[#86868b] text-[10px]">Total Members</div>
                <div className="text-base font-bold text-white font-mono">24,819</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0c0c0e] border border-[#1f1f25]">
                <div className="text-[#86868b] text-[10px]">Neon Karma Pool</div>
                <div className="text-base font-bold text-[#ff4500] font-mono">1.2M ▲</div>
              </div>
            </div>

            <button
              onClick={() => { playClickSound(); setIsCreateModalOpen(true); }}
              className="apple-btn-primary w-full py-2.5 text-xs font-bold cursor-pointer"
            >
              + Create New Post
            </button>
          </div>

          {/* Subreddit Rules & Rewards */}
          <div className="p-6 rounded-3xl bg-[#121216] border border-[#222226] space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-sm text-white">Top Creator Rewards</h4>
            </div>

            <div className="space-y-2 text-[#86868b]">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold font-mono">1.</span>
                <span>Top upvoted room setup of the week wins a <strong>Free Custom Mini Neon Sign</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#2997ff] font-bold font-mono">2.</span>
                <span>Get <strong>Verified Buyer Badge</strong> by reviewing your delivered sign.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#ff4500] font-bold font-mono">3.</span>
                <span>Earn 500 Karma ➔ Unlock permanent <strong>15% VIP Lifetime Discount</strong>.</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Help */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 to-[#121216] border border-emerald-500/20 space-y-3 text-xs">
            <div className="font-bold text-white text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Need Design Consultation?</span>
            </div>
            <p className="text-[#86868b] text-[11px]">
              Chat directly with our master signmakers & vector artists on WhatsApp:
            </p>
            <a
              href="https://wa.me/919166691274?text=Hi%20NEOCRAFT!%20I%20need%20custom%20neon%20design%20advice%20for%20my%20wall"
              target="_blank"
              rel="noreferrer"
              className="apple-btn-secondary w-full py-2 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5 text-emerald-400 border-emerald-500/30"
            >
              <span>WhatsApp Hotline (+91 91666 91274)</span>
            </a>
          </div>

        </div>

      </div>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
          <div className="relative w-full max-w-xl bg-[#161618] border border-[#2d2d30] rounded-3xl shadow-2xl p-6 text-white space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="font-bold text-sm flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#ff4500]" />
                <span>Create Community Post</span>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#86868b] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              
              <div className="space-y-1">
                <label className="font-semibold text-[#86868b]">Select Subreddit Flair:</label>
                <select
                  value={newFlair}
                  onChange={(e) => setNewFlair(e.target.value)}
                  className="w-full px-3 py-2 bg-[#101014] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                >
                  <option value="r/RoomSetups">r/RoomSetups (Show off your room/desk setup)</option>
                  <option value="r/CafeAndClubs">r/CafeAndClubs (Cafe/Bar commercial installations)</option>
                  <option value="r/DesignFeedback">r/DesignFeedback (Ask for font & color advice)</option>
                  <option value="r/SpiritualArt">r/SpiritualArt (Canvas paintings show-off)</option>
                  <option value="r/DIYAndMounting">r/DIYAndMounting (Installation questions & tips)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#86868b]">Post Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My new 100cm neon sign just arrived! Review + photos"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#101014] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#86868b]">Image URL (Optional):</label>
                <input
                  type="url"
                  placeholder="Paste photo link (or leave blank for default)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#101014] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#86868b]">Description / Review:</label>
                <textarea
                  rows={4}
                  placeholder="Share details about your setup, brightness, installation process, or questions..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 bg-[#101014] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="apple-btn-primary px-5 py-2 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Post</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
