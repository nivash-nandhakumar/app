// HTTP Client Utility Functions
class ApiClient {
    static async request(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        const config = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    static async get(endpoint, pathParams = {}) {
        const url = buildApiUrl(endpoint, pathParams);
        return this.request(url, { method: 'GET' });
    }

    static async post(endpoint, data, pathParams = {}) {
        const url = buildApiUrl(endpoint, pathParams);
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async put(endpoint, data, pathParams = {}) {
        const url = buildApiUrl(endpoint, pathParams);
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    static async delete(endpoint, pathParams = {}) {
        const url = buildApiUrl(endpoint, pathParams);
        return this.request(url, { method: 'DELETE' });
    }

    static async uploadFile(endpoint, file, pathParams = {}) {
        const url = buildApiUrl(endpoint, pathParams);
        const formData = new FormData();
        formData.append('file', file);

        return this.request(url, {
            method: 'POST',
            body: formData,
            headers: {} // Let browser set Content-Type for FormData
        });
    }
}

// Utility functions for common UI operations
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="spinner-border spinner-border-sm" role="status"></div> Loading...';
        element.disabled = true;
    }
}

function hideLoading(elementId, originalText) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = originalText;
        element.disabled = false;
    }
}

function showError(message, containerId = null) {
    const alertHtml = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    if (containerId) {
        document.getElementById(containerId).innerHTML = alertHtml;
    } else {
        console.error('Error:', message);
        alert(message);
    }
}

function showSuccess(message, containerId = null) {
    const alertHtml = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    if (containerId) {
        document.getElementById(containerId).innerHTML = alertHtml;
    } else {
        alert(message);
    }
}

// Export for global use
window.ApiClient = ApiClient;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.showError = showError;
window.showSuccess = showSuccess;
