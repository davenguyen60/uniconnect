export const UI_DIMENSIONS = {
  SIDEBAR_WIDTH: '350px',
  SIDEBAR_MOBILE_HEIGHT: '50vh', // Dự phòng cho mobile sau này
};

export const UI_Z_INDEX = {
  // Leaflet map thường là 400, nên Sidebar phải cao hơn
  SIDEBAR: 1000,
  MODAL: 1400,
  TOAST: 1500,
  LOADING_OVERLAY: 2000,
};

export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 500, // 0.5 giây
  MIN_CHARS_TO_SEARCH: 2, // Gõ trên 2 ký tự mới tìm
};

// Style cho thanh cuộn (Scrollbar) tùy chỉnh đẹp hơn mặc định
export const CUSTOM_SCROLLBAR_STYLE = {
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-track': { width: '6px' },
  '&::-webkit-scrollbar-thumb': { 
    background: '#CBD5E0', 
    borderRadius: '24px' 
  },
};