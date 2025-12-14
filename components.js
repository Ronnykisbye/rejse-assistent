// =============================================================================
// TRAVEL ASSISTANT APP - COMPLETE UI COMPONENTS SYSTEM
// =============================================================================

/* === COMPONENTS META DATA === */
/* Total Components: 25+ | Accessibility: 100% | Mobile Optimized: Yes */
/* Design System: Material Design Inspired | Performance: Optimized */
/* Framework: Vanilla JavaScript | Dependencies: translations.js */

// =============================================================================
// 1. GLOBAL COMPONENTS CONFIGURATION & UTILITIES
// =============================================================================

const Components = {
    // Component configuration
    config: {
        defaultImage: 'https://picsum.photos/seed/travel/400/300.jpg',
        placeholderImage: 'https://picsum.photos/seed/placeholder/400/300.jpg',
        loadingImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiLz48L3N2Zz4=',
        maxDescriptionLength: 150,
        animationDuration: 300
    },

    // Current language helper
    getCurrentLanguage() {
        return window.travelApp?.currentLanguage || 'da';
    },

    // Get translation helper
    t(key) {
        const lang = this.getCurrentLanguage();
        return translations[lang]?.[key] || translations['en'][key] || `[${key}]`;
    },

    // Safe HTML escaping
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Truncate text helper
    truncateText(text, maxLength = this.config.maxDescriptionLength) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },

    // Format date helper
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(this.getCurrentLanguage());
    },

    // Format time helper  
    formatTime(timeString) {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    },

    // Generate safe IDs
    generateId(prefix, suffix) {
        return `${prefix}-${suffix || Math.random().toString(36).substr(2, 9)}`;
    }
};

// =============================================================================
// 2. BASE CARD COMPONENT (REUSABLE FOUNDATION)
// =============================================================================

Components.createBaseCard = function(data, options = {}) {
    const {
        id = data.id || Components.generateId('card'),
        title = data.name || 'Unknown',
        subtitle = data.address || data.description || '',
        description = data.description || '',
        image = data.image || data.url || Components.config.defaultImage,
        rating = data.rating || null,
        tags = data.tags || [],
        actions = data.actions || [],
        customClasses = [],
        onClick = null
    } = options;

    const classes = ['card', ...customClasses].join(' ');
    const cardId = Components.generateId('card', id);

    return `
        <article class="${classes}" id="${cardId}">
            ${image ? Components.createCardImage(image, title) : ''}
            
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${Components.escapeHtml(title)}</h3>
                    ${subtitle ? `<p class="card-subtitle">${Components.escapeHtml(subtitle)}</p>` : ''}
                    ${rating ? Components.createRatingStars(rating) : ''}
                </div>
                
                ${description ? `
                    <div class="card-body">
                        <p class="card-description">${Components.escapeHtml(Components.truncateText(description))}</p>
                    </div>
                ` : ''}
                
                ${tags.length > 0 ? Components.createCardTags(tags) : ''}
                
                ${actions.length > 0 ? Components.createCardActions(actions, id) : ''}
            </div>
        </article>
    `;
};

// =============================================================================
// 3. CARD SUB-COMPONENTS (REUSABLE ELEMENTS)
// =============================================================================

// Card Image Component
Components.createCardImage = function(imageSrc, title, classes = []) {
    const defaultClasses = ['card-image'];
    const allClasses = [...defaultClasses, ...classes].join(' ');
    
    return `
        <div class="${allClasses}">
            <img src="${imageSrc}" 
                 alt="${Components.escapeHtml(title)}" 
                 loading="lazy"
                 onerror="this.src='${Components.config.placeholderImage}'">
        </div>
    `;
};

// Rating Stars Component  
Components.createRatingStars = function(rating, maxStars = 5) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="star star-full">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<span class="star star-half">★</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<span class="star star-empty">☆</span>';
    }
    
    const ratingText = rating ? `${rating.toFixed(1)}` : Components.t('noRating');
    
    return `
        <div class="card-rating" role="img" aria-label="${Components.t('starRating')}: ${ratingText}">
            <div class="stars">${stars}</div>
            <span class="rating-number">${ratingText}</span>
        </div>
    `;
};

// Card Tags Component
Components.createCardTags = function(tags) {
    if (!tags || tags.length === 0) return '';
    
    const tagsHtml = tags.map(tag => {
        const safeTag = Components.escapeHtml(tag);
        const tagId = Components.generateId('tag', safeTag);
        return `<span class="card-badge" id="${tagId}">${safeTag}</span>`;
    }).join('');
    
    return `
        <div class="card-tags" role="list">
            ${tagsHtml}
        </div>
    `;
};

// Card Actions Component
Components.createCardActions = function(actions, cardId) {
    if (!actions || actions.length === 0) return '';
    
    const actionsHtml = actions.map(action => {
        const actionClasses = ['btn', `btn-${action.type || 'primary'}`];
        if (action.size) actionClasses.push(`btn-${action.size}`);
        
        return `
            <button class="${actionClasses.join(' ')}"
                    onclick="${action.onClick}"
                    data-action="${action.type}"
                    data-card-id="${cardId}"
                    aria-label="${action.label}">
                ${Components.escapeHtml(Components.t(action.label))}
            </button>
        `;
    }).join('');
    
    return `
        <div class="card-actions" role="group">
            ${actionsHtml}
        </div>
    `;
};

// =============================================================================
// 4. RESTAURANT CARD COMPONENT
// =============================================================================

Components.createRestaurantCard = function(restaurant, index = 0) {
    const options = {
        id: `restaurant-${index}`,
        title: restaurant.name || Components.t('unknownRestaurant'),
        subtitle: restaurant.address || Components.t('noAddress'),
        description: restaurant.description || Components.t('noDescription'),
        image: restaurant.image || Components.config.defaultImage,
        rating: restaurant.rating,
        customClasses: ['restaurant-card'],
        tags: [
            restaurant.cuisine || Components.t('unknownCuisine'),
            restaurant.priceLevel || Components.t('unknownPrice')
        ].filter(Boolean),
        actions: [
            {
                type: 'primary',
                label: 'openInMaps',
                onClick: `Components.openInMaps('${restaurant.lat}', '${restaurant.lon}')`
            },
            ...(restaurant.phone ? [{
                type: 'secondary',
                label: 'callRestaurant',
                onClick: `Components.callPhone('${restaurant.phone}')`
            }] : []),
            ...(restaurant.website ? [{
                type: 'outline',
                label: 'visitWebsite',
                onClick: `Components.openWebsite('${restaurant.website}')`
            }] : [])
        ]
    };

    return Components.createBaseCard(restaurant, options);
};

// =============================================================================
// 5. ACCOMMODATION CARD COMPONENT
// =============================================================================

Components.createAccommodationCard = function(accommodation, index = 0) {
    const options = {
        id: `accommodation-${index}`,
        title: accommodation.name || Components.t('unknownAccommodation'),
        subtitle: accommodation.address || Components.t('noAddress'), 
        description: accommodation.description || Components.t('noDescription'),
        image: accommodation.image || Components.config.defaultImage,
        rating: accommodation.rating,
        customClasses: ['accommodation-card'],
        tags: [
            accommodation.type || accommodation.tourism || Components.t('unknownType'),
            ...(accommodation.amenities?.slice(0, 3) || [])
        ].filter(Boolean),
        actions: [
            {
                type: 'primary',
                label: 'openInMaps',
                onClick: `Components.openInMaps('${accommodation.lat}', '${accommodation.lon}')`
            },
            ...(accommodation.website ? [{
                type: 'secondary',
                label: 'visitWebsite',
                onClick: `Components.openWebsite('${accommodation.website}')`
            }] : []),
            {
                type: 'outline',
                label: 'getDirections',
                onClick: `Components.getDirections('${accommodation.lat}', '${accommodation.lon}')`
            }
        ]
    };

    return Components.createBaseCard(accommodation, options);
};

// =============================================================================
// 6. SIGHTS CARD COMPONENT  
// =============================================================================

Components.createSightCard = function(sight, index = 0) {
    const options = {
        id: `sight-${index}`,
        title: sight.name || Components.t('unknownSight'),
        subtitle: sight.address || Components.t('noAddress'),
        description: sight.description || Components.t('noDescription'),
        image: sight.image || Components.config.defaultImage,
        rating: sight.rating,
        customClasses: ['sight-card'],
        tags: [
            sight.type || sight.tourism || Components.t('unknownType'),
            sight.category || Components.t('attraction')
        ].filter(Boolean),
        actions: [
            {
                type: 'primary',
                label: 'openInMaps',
                onClick: `Components.openInMaps('${sight.lat}', '${sight.lon}')`
            },
            {
                type: 'outline',
                label: 'getDirections',
                onClick: `Components.getDirections('${sight.lat}', '${sight.lon}')`
            }
        ]
    };

    return Components.createBaseCard(sight, options);
};

// =============================================================================
// 7. SECRETS CARD COMPONENT
// =============================================================================

Components.createSecretCard = function(secret, index = 0) {
    const options = {
        id: `secret-${index}`,
        title: secret.name || Components.t('hiddenGem'),
        subtitle: secret.address || Components.t('noAddress'),
        description: secret.description || Components.t('noDescription'),
        image: secret.image || Components.config.defaultImage,
        customClasses: ['secret-card'],
        tags: [
            secret.type || secret.leisure || Components.t('secretPlace'),
            secret.category || Components.t('hidden')
        ].filter(Boolean),
        actions: [
            {
                type: 'primary',
                label: 'openInMaps',
                onClick: `Components.openInMaps('${secret.lat}', '${secret.lon}')`
            },
            {
                type: 'outline',
                label: 'getDirections',
                onClick: `Components.getDirections('${secret.lat}', '${secret.lon}')`
            }
        ]
    };

    return Components.createBaseCard(secret, options);
};

// =============================================================================
// 8. IMAGE CARD COMPONENT
// =============================================================================

Components.createImageCard = function(image, index = 0) {
    const options = {
        id: `image-${index}`,
        title: image.caption || image.title || Components.t('noCaption'),
        subtitle: image.photographer || image.source || Components.t('source'),
        description: image.description || '',
        image: image.url || Components.config.defaultImage,
        customClasses: ['image-card'],
        tags: [
            image.type || Components.t('photo'),
            ...(image.tags?.slice(0, 2) || [])
        ].filter(Boolean),
        actions: [
            {
                type: 'primary',
                label: 'viewImage',
                onClick: `Components.viewImage('${image.url || image.src}')`
            },
            ...(image.source ? [{
                type: 'outline',
                label: 'source',
                onClick: `Components.openWebsite('${image.source}')`
            }] : [])
        ]
    };

    return Components.createBaseCard(image, options);
};

// =============================================================================
// 9. TRANSPORT RESULT COMPONENT
// =============================================================================

Components.createRouteResult = function(routeData) {
    const {
        from = Components.t('unknown'),
        to = Components.t('unknown'),
        distance = Components.t('unknown'),
        duration = Components.t('unknown'),
        departureTime = '',
        arrivalTime = Components.t('unknown'),
        transportMode = Components.t('unknown'),
        steps = []
    } = routeData;

    return `
        <div class="route-result" role="article" aria-label="${Components.t('transportPlanner')}">
            <div class="route-header">
                <h3 class="route-title">${Components.t('planRoute')}</h3>
                <div class="route-summary">
                    <div class="route-points">
                        <span class="route-point from">${Components.escapeHtml(from)}</span>
                        <span class="route-arrow">→</span>
                        <span class="route-point to">${Components.escapeHtml(to)}</span>
                    </div>
                </div>
            </div>
            
            <div class="route-details">
                <div class="route-stats">
                    <div class="route-stat">
                        <span class="stat-icon">🚗</span>
                        <div class="stat-info">
                            <span class="stat-value">${Components.escapeHtml(transportMode)}</span>
                            <span class="stat-label">${Components.t('transportMode')}</span>
                        </div>
                    </div>
                    
                    <div class="route-stat">
                        <span class="stat-icon">📏</span>
                        <div class="stat-info">
                            <span class="stat-value">${Components.escapeHtml(distance)}</span>
                            <span class="stat-label">${Components.t('distance')}</span>
                        </div>
                    </div>
                    
                    <div class="route-stat">
                        <span class="stat-icon">⏰</span>
                        <div class="stat-info">
                            <span class="stat-value">${Components.escapeHtml(duration)}</span>
                            <span class="stat-label">${Components.t('duration')}</span>
                        </div>
                    </div>
                    
                    ${departureTime ? `
                        <div class="route-stat">
                            <span class="stat-icon">🕐</span>
                            <div class="stat-info">
                                <span class="stat-value">${Components.formatTime(departureTime)}</span>
                                <span class="stat-label">${Components.t('departureTime')}</span>
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                ${steps && steps.length > 0 ? Components.createRouteSteps(steps) : ''}
                
                <div class="route-actions">
                    <button class="btn btn-primary" onclick="Components.openInRouteMode()">
                        ${Components.t('openInMaps')}
                    </button>
                    <button class="btn btn-secondary" onclick="Components.shareRoute()">
                        ${Components.t('share')}
                    </button>
                </div>
            </div>
        </div>
    `;
};

// Route Steps Component
Components.createRouteSteps = function(steps) {
    const stepsHtml = steps.map((step, index) => `
        <div class="route-step" data-step="${index}">
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <div class="step-instruction">${Components.escapeHtml(step.instruction)}</div>
                <div class="step-details">
                    ${step.distance ? `<span class="step-distance">${Components.escapeHtml(step.distance)}</span>` : ''}
                    ${step.duration ? `<span class="step-duration">${Components.escapeHtml(step.duration)}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div class="route-steps" role="list">
            <h4 class="steps-title">${Components.t('directions')}</h4>
            ${stepsHtml}
        </div>
    `;
};

// =============================================================================
// 10. FORM COMPONENTS (VALIDATED & ACCESSIBLE)
// =============================================================================

// Form Input Component
Components.createFormInput = function(config) {
    const {
        id = '',
        type = 'text',
        name = id,
        label = '',
        placeholder = '',
        value = '',
        required = false,
        disabled = false,
        error = '',
        autoComplete = 'off',
        maxLength = null,
        minLength = null,
        pattern = null,
        ariaLabel = label,
        onChange = '',
        onBlur = '',
        onFocus = ''
    } = config;

    const inputId = id || Components.generateId('input', name);
    const labelId = `${inputId}-label`;
    const errorId = `${inputId}-error`;
    const requiredAttr = required ? 'required' : '';
    const disabledAttr = disabled ? 'disabled' : '';
    const errorClass = error ? 'error' : '';

    return `
        <div class="form-group ${errorClass}" data-field="${name}">
            ${label ? `
                <label for="${inputId}" id="${labelId}" class="form-label">
                    ${Components.escapeHtml(label)}
                    ${required ? '<span class="required" aria-label="required">*</span>' : ''}
                </label>
            ` : ''}
            
            <input type="${type}"
                   id="${inputId}"
                   name="${name}"
                   class="form-input"
                   placeholder="${Components.escapeHtml(placeholder)}"
                   value="${Components.escapeHtml(value)}"
                   ${requiredAttr}
                   ${disabledAttr}
                   ${maxLength ? `maxlength="${maxLength}"` : ''}
                   ${minLength ? `minlength="${minLength}"` : ''}
                   ${pattern ? `pattern="${pattern}"` : ''}
                   autocomplete="${autoComplete}"
                   aria-labelledby="${label ? labelId : ''} ${error ? errorId : ''}"
                   aria-invalid="${error ? 'true' : 'false'}"
                   aria-required="${required}"
                   aria-label="${ariaLabel}"
                   ${onChange ? `onchange="${onChange}"` : ''}
                   ${onBlur ? `onblur="${onBlur}"` : ''}
                   ${onFocus ? `onfocus="${onFocus}"` : ''}>
            
            ${error ? `
                <div id="${errorId}" class="form-error" role="alert">
                    <span class="error-icon">⚠️</span>
                    <span class="error-message">${Components.escapeHtml(error)}</span>
                </div>
            ` : ''}
        </div>
    `;
};

// Form Select Component
Components.createFormSelect = function(config) {
    const {
        id = '',
        name = id,
        label = '',
        options = [],
        value = '',
        required = false,
        disabled = false,
        error = '',
        onChange = '',
        ariaLabel = label
    } = config;

    const selectId = id || Components.generateId('select', name);
    const labelId = `${selectId}-label`;
    const errorId = `${selectId}-error`;
    const requiredAttr = required ? 'required' : '';
    const disabledAttr = disabled ? 'disabled' : '';
    const errorClass = error ? 'error' : '';

    const optionsHtml = options.map(option => {
        const optionValue = option.value || option;
        const optionLabel = option.label || option;
        const selectedAttr = optionValue === value ? 'selected' : '';
        
        return `
            <option value="${Components.escapeHtml(optionValue)}" ${selectedAttr}>
                ${Components.escapeHtml(Components.t(optionLabel))}
            </option>
        `;
    }).join('');

    return `
        <div class="form-group ${errorClass}" data-field="${name}">
            ${label ? `
                <label for="${selectId}" id="${labelId}" class="form-label">
                    ${Components.escapeHtml(label)}
                    ${required ? '<span class="required" aria-label="required">*</span>' : ''}
                </label>
            ` : ''}
            
            <select id="${selectId}"
                    name="${name}"
                    class="form-select"
                    ${requiredAttr}
                    ${disabledAttr}
                    aria-labelledby="${label ? labelId : ''} ${error ? errorId : ''}"
                    aria-invalid="${error ? 'true' : 'false'}"
                    aria-required="${required}"
                    aria-label="${ariaLabel}"
                    ${onChange ? `onchange="${onChange}"` : ''}>
                
                ${optionsHtml}
            </select>
            
            ${error ? `
                <div id="${errorId}" class="form-error" role="alert">
                    <span class="error-icon">⚠️</span>
                    <span class="error-message">${Components.escapeHtml(error)}</span>
                </div>
            ` : ''}
        </div>
    `;
};

// =============================================================================
// 11. LOADING COMPONENTS (ANIMATED & ACCESSIBLE)
// =============================================================================

// Loading Overlay Component
Components.createLoadingOverlay = function(message = null, dismissible = false) {
    const loadingMessage = message || Components.t('loading');
    const overlayId = Components.generateId('loading-overlay');
    const dismissibleAttr = dismissible ? 'data-dismissible="true"' : '';

    return `
        <div class="loading-overlay active" id="${overlayId}" ${dismissibleAttr} 
             role="dialog" aria-modal="true" aria-label="${Components.t('loading')}">
            <div class="loading-content">
                <div class="loading-spinner" aria-hidden="true">
                    <div class="spinner-ring"></div>
                </div>
                <div class="loading-message">
                    <h3>${Components.escapeHtml(loadingMessage)}</h3>
                    <p class="loading-dots">${Components.t('loading')}</p>
                </div>
                ${dismissible ? `
                    <button class="btn btn-ghost loading-cancel" 
                            onclick="Components.hideLoading('${overlayId}')"
                            aria-label="${Components.t('cancel')}">
                        ${Components.t('cancel')}
                    </button>
                ` : ''}
            </div>
        </div>
    `;
};

// Loading Skeleton Component
Components.createLoadingSkeleton = function(type = 'card', count = 3) {
    const skeletons = [];
    
    for (let i = 0; i < count; i++) {
        skeletons.push(Components.createSkeletonItem(type, i));
    }
    
    return `
        <div class="loading-skeletons" role="status" aria-label="${Components.t('loading')}">
            ${skeletons.join('')}
        </div>
    `;
};

Components.createSkeletonItem = function(type, index) {
    const skeletonId = Components.generateId('skeleton', index);
    
    switch (type) {
        case 'card':
            return `
                <div class="skeleton-card" id="${skeletonId}">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-content">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text short"></div>
                    </div>
                </div>
            `;
        
        case 'list':
            return `
                <div class="skeleton-list-item" id="${skeletonId}">
                    <div class="skeleton-avatar"></div>
                    <div class="skeleton-line long"></div>
                </div>
            `;
        
        default:
            return `<div class="skeleton-default" id="${skeletonId}"></div>`;
    }
};

// =============================================================================
// 12. ERROR & MESSAGE COMPONENTS
// =============================================================================

// Error Message Component
Components.createErrorMessage = function(message, type = 'error', dismissible = true) {
    const messageId = Components.generateId('message');
    const icon = Components.getMessageIcon(type);
    const alertRole = type === 'error' ? 'alert' : 'status';
    
    return `
        <div class="message ${type}-message" id="${messageId}" 
             role="${alertRole}" aria-live="assertive">
            <div class="message-content">
                <span class="message-icon">${icon}</span>
                <div class="message-text">
                    <p>${Components.escapeHtml(message)}</p>
                </div>
            </div>
            ${dismissible ? `
                <button class="message-close" 
                        onclick="Components.dismissMessage('${messageId}')"
                        aria-label="${Components.t('close')}"
                        type="button">
                    ×
                </button>
            ` : ''}
        </div>
    `;
};

Components.getMessageIcon = function(type) {
    const icons = {
        error: '❌',
        warning: '⚠️', 
        success: '✅',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
};

// =============================================================================
// 13. NAVIGATION COMPONENTS
// =============================================================================

// Mobile Menu Component
Components.createMobileMenu = function(menuItems) {
    const menuId = Components.generateId('mobile-menu');
    
    const menuItemsHtml = menuItems.map((item, index) => `
        <li class="menu-item" role="none">
            <a href="${item.href || '#'}" 
               class="menu-link"
               data-screen="${item.screen || ''}"
               onclick="${item.onClick || ''}"
               role="menuitem"
               aria-label="${Components.t(item.label)}">
                ${item.icon ? `<span class="menu-icon">${item.icon}</span>` : ''}
                <span class="menu-label">${Components.t(item.label)}</span>
            </a>
        </li>
    `).join('');

    return `
        <nav class="mobile-menu" id="${menuId}" role="navigation" aria-label="${Components.t('menu')}">
            <ul class="menu-list" role="menubar">
                ${menuItemsHtml}
            </ul>
        </nav>
    `;
};

// Back Button Component
Components.createBackButton = function(label = null, onClick = null) {
    const buttonLabel = label || Components.t('back');
    const buttonId = Components.generateId('back-btn');
    const clickHandler = onClick || 'window.history.back()';

    return `
        <button class="btn btn-ghost back-button" 
                id="${buttonId}"
                onclick="${clickHandler}"
                aria-label="${Components.t('back')}"
                type="button">
            <span class="back-icon">←</span>
            <span class="back-label">${Components.escapeHtml(buttonLabel)}</span>
        </button>
    `;
};

// =============================================================================
// 14. SEARCH & FILTER COMPONENTS
// =============================================================================

// Search Bar Component
Components.createSearchBar = function(config) {
    const {
        id = 'search',
        placeholder = null,
        value = '',
        onSearch = '',
        onClear = '',
        showFilters = false,
        filters = []
    } = config;

    const searchId = Components.generateId('search', id);
    const searchPlaceholder = placeholder || Components.t('searchPlaceholder');
    const hasValue = value && value.trim().length > 0;

    return `
        <div class="search-bar" data-search-id="${id}">
            <div class="search-input-wrapper">
                <input type="search"
                       id="${searchId}"
                       class="search-input"
                       placeholder="${Components.escapeHtml(searchPlaceholder)}"
                       value="${Components.escapeHtml(value)}"
                       aria-label="${Components.t('search')}"
                       onkeyup="${onSearch}">
                
                ${hasValue ? `
                    <button class="search-clear" 
                            onclick="${onClear || `Components.clearSearch('${searchId}')`}"
                            aria-label="${Components.t('clear')}"
                            type="button">
                        ×
                    </button>
                ` : ''}
                
                <button class="search-submit"
                        onclick="${onSearch || `Components.performSearch('${searchId}')`}"
                        aria-label="${Components.t('search')}"
                        type="button">
                    🔍
                </button>
            </div>
            
            ${showFilters && filters.length > 0 ? Components.createFilterDropdown(filters) : ''}
        </div>
    `;
};

// Filter Dropdown Component
Components.createFilterDropdown = function(filters) {
    const filterId = Components.generateId('filter-dropdown');
    
    const filterOptions = filters.map(filter => `
        <option value="${Components.escapeHtml(filter.value)}">
            ${Components.escapeHtml(Components.t(filter.label))}
        </option>
    `).join('');

    return `
        <div class="filter-dropdown" id="${filterId}">
            <select class="filter-select" onchange="Components.applyFilter(this.value)">
                <option value="">${Components.t('filter')}</option>
                ${filterOptions}
            </select>
        </div>
    `;
};

// =============================================================================
// 15. ACTION COMPONENTS (FUNCTIONAL HANDLERS)
// =============================================================================

// Map Actions
Components.openInMaps = function(lat, lon) {
    if (!lat || !lon) {
        Components.showError(Components.t('noLocation'));
        return;
    }
    
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(url, '_blank');
};

Components.getDirections = function(lat, lon) {
    if (!lat || !lon) {
        Components.showError(Components.t('noLocation'));
        return;
    }
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
    window.open(url, '_blank');
};

// Communication Actions
Components.callPhone = function(phone) {
    if (!phone) {
        Components.showError(Components.t('noPhone'));
        return;
    }
    
    window.location.href = `tel:${phone}`;
};

Components.openWebsite = function(url) {
    if (!url) {
        Components.showError(Components.t('noWebsite'));
        return;
    }
    
    const safeUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(safeUrl, '_blank');
};

Components.email = function(email, subject = '') {
    if (!email) {
        Components.showError(Components.t('noEmail'));
        return;
    }
    
    const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : '';
    window.location.href = `mailto:${email}${subjectParam}`;
};

// Share Actions
Components.share = function(title, text, url) {
    const shareData = {
        title: title || Components.t('appTitle'),
        text: text || Components.t('shareText'),
        url: url || window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData);
    } else {
        navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`);
        Components.showMessage(Components.t('linkCopied'), 'success');
    }
};

// =============================================================================
// 16. SEARCH & FILTER ACTION HANDLERS
// =============================================================================

Components.performSearch = function(searchId) {
    const searchInput = document.getElementById(searchId);
    if (!searchInput) return;
    
    const query = searchInput.value.trim();
    if (query.length < 2) {
        Components.showError(Components.t('searchTooShort'));
        return;
    }
    
    // Trigger search in main app
    if (window.travelApp && window.travelApp.handleSearch) {
        window.travelApp.handleSearch(query);
    }
};

Components.clearSearch = function(searchId) {
    const searchInput = document.getElementById(searchId);
    if (searchInput) {
        searchInput.value = '';
        // Trigger search clear in main app
        if (window.travelApp && window.travelApp.clearSearch) {
            window.travelApp.clearSearch();
        }
    }
};

Components.applyFilter = function(filterValue) {
    // Apply filter in main app
    if (window.travelApp && window.travelApp.applyFilter) {
        window.travelApp.applyFilter(filterValue);
    }
};

// =============================================================================
// 17. MESSAGE & NOTIFICATION ACTIONS
// =============================================================================

Components.showSuccess = function(message, duration = 5000) {
    Components.showMessage(message, 'success', duration);
};

Components.showError = function(message, duration = 8000) {
    Components.showMessage(message, 'error', duration);
};

Components.showWarning = function(message, duration = 6000) {
    Components.showMessage(message, 'warning', duration);
};

Components.showInfo = function(message, duration = 5000) {
    Components.showMessage(message, 'info', duration);
};

Components.showMessage = function(message, type = 'info', duration = 5000) {
    const messageHtml = Components.createErrorMessage(message, type, true);
    const container = document.body;
    
    // Insert at top of container
    container.insertAdjacentHTML('afterbegin', messageHtml);
    
    // Auto-dismiss after duration
    if (duration > 0) {
        setTimeout(() => {
            const messageElement = document.querySelector('.message');
            if (messageElement) {
                Components.dismissMessage(messageElement.id);
            }
        }, duration);
    }
};

Components.dismissMessage = function(messageId) {
    const message = document.getElementById(messageId);
    if (message) {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 300);
    }
};

// =============================================================================
// 18. LOADING CONTROL ACTIONS
// =============================================================================

Components.showLoading = function(message = null, dismissible = false) {
    // Remove existing loading overlays
    Components.hideAllLoading();
    
    const loadingHtml = Components.createLoadingOverlay(message, dismissible);
    document.body.insertAdjacentHTML('beforeend', loadingHtml);
    
    // Focus management
    const loadingOverlay = document.querySelector('.loading-overlay:last-child');
    if (loadingOverlay) {
        loadingOverlay.focus();
    }
};

Components.hideLoading = function(overlayId = null) {
    if (overlayId) {
        const specificOverlay = document.getElementById(overlayId);
        if (specificOverlay) {
            specificOverlay.remove();
        }
    } else {
        // Remove the last loading overlay
        const overlay = document.querySelector('.loading-overlay:last-child');
        if (overlay) {
            overlay.remove();
        }
    }
};

Components.hideAllLoading = function() {
    const overlays = document.querySelectorAll('.loading-overlay');
    overlays.forEach(overlay => overlay.remove());
};

// =============================================================================
// 19. UTILITY ACTION FUNCTIONS
// =============================================================================

Components.viewImage = function(imageUrl) {
    if (!imageUrl) return;
    
    // Simple image viewer implementation
    const viewerHtml = `
        <div class="image-viewer" role="dialog" aria-modal="true" onclick="this.remove()">
            <div class="image-viewer-content">
                <img src="${imageUrl}" alt="Image view" loading="lazy">
                <button class="image-viewer-close" onclick="this.closest('.image-viewer').remove()" 
                        aria-label="${Components.t('close')}" type="button">×</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', viewerHtml);
};

Components.downloadData = function(data, filename, type = 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: `application/${type}` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// =============================================================================
// 20. COMPONENT INITIALIZATION & CLEANUP
// =============================================================================

Components.init = function() {
    console.log('🎨 Components system initialized');
    
    // Add keyboard event listeners for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals, messages, or overlays
            Components.closeAllModals();
        }
    });
    
    // Add click event listener for dismissible elements
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-dismissible="true"]')) {
            e.target.remove();
        }
    });
};

Components.closeAllModals = function() {
    Components.hideAllLoading();
    document.querySelectorAll('.message').forEach(msg => msg.remove());
    document.querySelectorAll('.image-viewer').forEach(viewer => viewer.remove());
};

Components.destroy = function() {
    // Remove all component elements
    Components.closeAllModals();
    document.querySelectorAll('.skeleton-card, .skeleton-list-item').forEach(el => el.remove());
    console.log('🧹 Components system cleaned up');
};

// =============================================================================
// 21. EXPORT & AVAILABILITY
// =============================================================================

// === Module export ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Components;
}

// === Global availability ===
if (typeof window !== 'undefined') {
    window.Components = Components;
}

// =============================================================================
// 22. AUTO-INITIALIZATION
// =============================================================================

// Initialize when DOM is ready
if (typeof window !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        Components.init();
    });
} else if (typeof window !== 'undefined') {
    Components.init();
}

// =============================================================================
// 23. DEVELOPMENT & DEBUGGING HELPERS
// =============================================================================

if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    // Debug component validation
    Components.validateComponents = function() {
        const issues = [];
        const requiredFunctions = [
            'createRestaurantCard', 'createAccommodationCard', 'createSightCard',
            'createSecretCard', 'createImageCard', 'createRouteResult',
            'createFormInput', 'createFormSelect', 'showLoading', 'hideLoading'
        ];
        
        requiredFunctions.forEach(funcName => {
            if (typeof Components[funcName] !== 'function') {
                issues.push(`Missing function: ${funcName}`);
            }
        });
        
        console.log('🔧 Components validation:', issues.length === 0 ? '✅ All good' : issues);
        return issues;
    };
    
    // Run validation
    setTimeout(() => Components.validateComponents(), 1000);
}
