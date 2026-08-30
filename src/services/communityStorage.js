import { generateAIBatch, generateSingleAIPost } from '../utils/aiCommunityBot';

const STORAGE_KEY = 'neocraft_community_posts_v2';
const BOT_STATUS_KEY = 'neocraft_community_bot_enabled';
const LAST_RUN_KEY = 'neocraft_community_bot_last_run';

const INITIAL_SEED_POSTS = [
  {
    id: 'seed-1',
    subreddit: 'r/RoomSetups',
    author: 'u/Rohan_Cyberpunk',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    timeAgo: '2 hours ago',
    isVerifiedBuyer: true,
    title: 'Finally installed my "NEVER SLEEP" 120cm Cyber Cyan sign above my desk! The wall glow is insane ✨',
    content: 'Ordered last Thursday and got it in 4 days with the heavy-duty standoff kit. The remote dimmer lets me drop it to 10% brightness when gaming at night. What do you guys think? #CustomNeon #GamingSetup #DeskInspo',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
    hashtags: ['#CustomNeon', '#GamingSetup', '#DeskInspo', '#Cyberpunk'],
    upvotes: 482,
    userVote: 1,
    commentsCount: 34,
    linkedProduct: {
      name: 'Custom Neon "NEVER SLEEP" (120cm • Cyber Cyan)',
      price: 8999
    },
    comments: [
      {
        id: 'c1',
        author: 'u/Priya_Designer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        timeAgo: '1 hour ago',
        text: 'The acrylic laser cut line is so clean! Did you use screws or the 3M tape?',
        upvotes: 28,
        isVerified: true
      },
      {
        id: 'c2',
        author: 'u/Rohan_Cyberpunk',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        timeAgo: '45 mins ago',
        text: 'Used the stainless steel standoffs included in the box! Took about 10 minutes with a drill.',
        upvotes: 14,
        isOP: true
      }
    ]
  },
  {
    id: 'seed-2',
    subreddit: 'r/CafeAndClubs',
    author: 'u/TheSocialBistro',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    timeAgo: '5 hours ago',
    isVerifiedBuyer: true,
    title: 'Our new cafe aesthetic corner in Koramangala, Bangalore. Customers take 50+ reels here daily ☕✨',
    content: 'Wanted to share our 2-piece warm gold "GOOD VIBES ONLY & ESPRESSO" installation. The 12V solid-state efficiency keeps our electricity bill almost zero for 14 hours straight. #CafeAesthetics #BangaloreCafes',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    hashtags: ['#CafeAesthetics', '#BangaloreCafes', '#CommercialNeon', '#CoffeeShop'],
    upvotes: 819,
    userVote: 0,
    commentsCount: 52,
    linkedProduct: {
      name: 'Cafe Custom Script Neon Sign (Warm Amber Gold)',
      price: 11499
    },
    comments: [
      {
        id: 'c3',
        author: 'u/Arjun_K',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        timeAgo: '3 hours ago',
        text: 'Visiting this weekend! The warm gold kelvin matches your wooden aesthetic perfectly.',
        upvotes: 19,
        isVerified: false
      }
    ]
  }
];

export function getStoredCommunityPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_POSTS));
      return INITIAL_SEED_POSTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_SEED_POSTS;
  }
}

export function saveCommunityPosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event('neocraft_community_updated'));
  } catch (e) {
    console.error('Failed to save community posts', e);
  }
}

export function triggerAIBatchNow(count = 10) {
  const current = getStoredCommunityPosts();
  const newBatch = generateAIBatch(count);
  const updated = [...newBatch, ...current];
  saveCommunityPosts(updated);
  localStorage.setItem(LAST_RUN_KEY, new Date().toISOString());
  return updated;
}

export function deleteCommunityPost(id) {
  const current = getStoredCommunityPosts();
  const updated = current.filter(p => p.id !== id);
  saveCommunityPosts(updated);
  return updated;
}

export function getAutoPostingStatus() {
  try {
    const val = localStorage.getItem(BOT_STATUS_KEY);
    return val === null ? true : val === 'true'; // Enabled by default
  } catch (e) {
    return true;
  }
}

export function setAutoPostingStatus(enabled) {
  try {
    localStorage.setItem(BOT_STATUS_KEY, enabled ? 'true' : 'false');
  } catch (e) {
    // safe
  }
}

export function getLastAIBotRunTime() {
  try {
    return localStorage.getItem(LAST_RUN_KEY) || 'Never (Ready to Run)';
  } catch (e) {
    return 'Never';
  }
}
