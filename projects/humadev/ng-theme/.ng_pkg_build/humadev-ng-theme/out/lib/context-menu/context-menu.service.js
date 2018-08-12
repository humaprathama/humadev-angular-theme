/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
export class ContextMenuService {
    constructor() {
        this.contextMenu = [];
        this.refs = [];
    }
    /**
     * @param {?} overlay
     * @return {?}
     */
    setContextMenuOverlay(overlay) {
        this.contextMenu = this.contextMenu.concat(overlay);
    }
    /**
     * @return {?}
     */
    getContextMenuOverlay() {
        return this.contextMenu;
    }
    /**
     * @return {?}
     */
    closeAllContextMenus() {
        if (this.contextMenu) {
            this.contextMenu.forEach((overlay, index) => {
                overlay.detach();
                overlay.dispose();
            });
        }
        this.contextMenu = [];
    }
    /**
     * @param {?} el
     * @return {?}
     */
    setRef(el) {
        this.refs = this.refs.concat(el);
    }
    /**
     * @return {?}
     */
    getRef() {
        return this.refs;
    }
    /**
     * @return {?}
     */
    destroyAllRef() {
        this.refs = [];
    }
}
ContextMenuService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ContextMenuService.ctorParameters = () => [];
function ContextMenuService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ContextMenuService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ContextMenuService.ctorParameters;
    /** @type {?} */
    ContextMenuService.prototype.contextMenu;
    /** @type {?} */
    ContextMenuService.prototype.refs;
}
//# sourceMappingURL=context-menu.service.js.map