// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api',
    ENDPOINTS: {
        // User endpoints
        USERS: '/users',
        LOGIN: '/users/login',
        SIGNUP: '/users/signup',
        
        // Agent endpoints
        AGENTS: '/agents',
        AGENT_APPLY: '/agents/apply',
        
        // Policy endpoints
        POLICIES: '/policies',
        POLICIES_BY_CUSTOMER: '/policies/customer',
        EXPIRED_POLICIES: '/policies/expired',
        
        // Claim endpoints
        CLAIMS: '/claims',
        CLAIMS_BY_CUSTOMER: '/claims/customer',
        PENDING_CLAIMS: '/claims/pending',
        UPLOAD_PROOF: '/claims/{id}/upload-proof',
        UPDATE_CLAIM_STATUS: '/claims/{id}/status'
    }
};

// Helper function to build full URL
function buildApiUrl(endpoint, pathParams = {}) {
    let url = API_CONFIG.BASE_URL + endpoint;
    
    // Replace path parameters
    Object.keys(pathParams).forEach(key => {
        url = url.replace(`{${key}}`, pathParams[key]);
    });
    
    return url;
}

// Export for use in other files
window.API_CONFIG = API_CONFIG;
window.buildApiUrl = buildApiUrl;
