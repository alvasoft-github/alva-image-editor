/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Image loader
 */
import Component from '../interface/component';
import {componentNames, rejectMessages} from '../consts';
import {Promise} from '../util';

const imageOption = {
    padding: 0,
    crossOrigin: 'Anonymous'
};

/**
 * ImageLoader components
 * @extends {Component}
 * @class ImageLoader
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */
class ImageLoader extends Component {
    constructor(graphics) {
        super(componentNames.IMAGE_LOADER, graphics);
    }

    /**
     * Load image from url
     * @param {?string} imageName - File name
     * @param {?(fabric.Image|string)} img - fabric.Image instance or URL of an image
     * @param {Object} options - image options rect
     *  @param {String} options.crossOrigin - Cross-origin value used to load the image, can be "anonymous" or "use-credentials"
     * @returns {Promise}
     */
    load(imageName, img, options) {
        let promise;

        if (!imageName && !img) { // Back to the initial state, not error.
            const canvas = this.getCanvas();

            canvas.backgroundImage = null;
            canvas.renderAll();

            promise = new Promise(resolve => {
                this.setCanvasImage('', null);
                resolve();
            });
        } else {
            promise = this._setBackgroundImage(img, options).then(oImage => {
                this.setCanvasImage(imageName, oImage);
                this.adjustCanvasDimension();

                return oImage;
            });
        }

        return promise;
    }

    /**
     * Set background image
     * @param {?(fabric.Image|String)} img fabric.Image instance or URL of an image to set background to
     * @param {Object} options - image options rect
     *  @param {String} options.crossOrigin - Cross-origin value used to load the image, can be "anonymous" or "use-credentials"
     * @returns {Promise}
     * @private
     */
    _setBackgroundImage(img, options) {
        if (!img) {
            return Promise.reject(rejectMessages.loadImage);
        }

        return new Promise((resolve, reject) => {
            const canvas = this.getCanvas();

            canvas.setBackgroundImage(img, () => {
                const oImage = canvas.backgroundImage;

                if (oImage && oImage.getElement()) {
                    resolve(oImage);
                } else {
                    reject(rejectMessages.loadingImageFailed);
                }
            }, options || imageOption);
        });
    }
}

export default ImageLoader;
