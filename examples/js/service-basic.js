/**
 * basic.js
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview
 */

/* eslint-disable vars-on-top,no-var,strict,prefer-template,prefer-arrow-callback,prefer-destructuring,object-shorthand,require-jsdoc,complexity,prefer-const,no-unused-vars */
var supportingFileAPI = !!(window.File && window.FileList && window.FileReader);
var rImageType = /data:(image\/.+);base64,/;
var shapeOptions = {};
var shapeType;
var activeObjectId;
var rotation = 0;

// Buttons
var $btns = $('.menu-item');
var $btnsActivatable = $btns.filter('.activatable');
var $inputImage = $('#input-image-file');
var $btnDownload = $('#btn-download');

var $btnUndo = $('#btn-undo');
var $btnRedo = $('#btn-redo');
var $btnClearObjects = $('#btn-clear-objects');
var $btnRemoveActiveObject = $('#btn-remove-active-object');
var $btnCrop = $('#btn-crop');
var $btnFlip = $('#btn-flip');
var $btnRotation = $('#btn-rotation');
var $btnDrawLine = $('#btn-draw-line');
var $btnDrawShape = $('#btn-draw-shape');
var $btnApplyCrop = $('#btn-apply-crop');
var $btnCancelCrop = $('#btn-cancel-crop');
var $btnFlipX = $('#btn-flip-x');
var $btnFlipY = $('#btn-flip-y');
var $btnResetFlip = $('#btn-reset-flip');
var $btnRotateClockwise = $('#btn-rotate-clockwise');
var $btnRotateCounterClockWise = $('#btn-rotate-counter-clockwise');
var $btnText = $('#btn-text');
var $btnTextStyle = $('.btn-text-style');
var $btnAddIcon = $('#btn-add-icon');
var $btnRegisterIcon = $('#btn-register-icon');
var $btnMaskFilter = $('#btn-mask-filter');
var $btnImageFilter = $('#btn-image-filter');
var $btnLoadMaskImage = $('#input-mask-image-file');
var $btnApplyMask = $('#btn-apply-mask');
var $btnClose = $('.close');

// Input etc.
var $inputRotationRange = $('#input-rotation-range');
var $inputStraightenRange = $('#input-straighten-range');
var $inputBrushWidthRange = $('#input-brush-width-range');
var $inputFontSizeRange = $('#input-font-size-range');
var $inputStrokeWidthRange = $('#input-stroke-width-range');
var $inputCheckTransparent = $('#input-check-transparent');
var $inputCheckGrayscale = $('#input-check-grayscale');
var $inputCheckInvert = $('#input-check-invert');
var $inputCheckSepia = $('#input-check-sepia');
var $inputCheckBlur = $('#input-check-blur');
var $inputCheckSharpen = $('#input-check-sharpen');
var $inputCheckEmboss = $('#input-check-emboss');
var $inputCheckRemoveWhite = $('#input-check-remove-white');
var $inputRangeRemoveWhiteThreshold = $('#input-range-remove-white-threshold');
var $inputRangeRemoveWhiteDistance = $('#input-range-remove-white-distance');
var $inputCheckBrightness = $('#input-check-brightness');
var $inputRangeBrightnessValue = $('#input-range-brightness-value');
var $inputCheckNoise = $('#input-check-noise');
var $inputRangeNoiseValue = $('#input-range-noise-value');
var $inputCheckPixelate = $('#input-check-pixelate');
var $inputRangePixelateValue = $('#input-range-pixelate-value');
var $inputCheck1977 = $('#input-check-1977');
var $inputCheckAmaro = $('#input-check-amaro');
var $inputCheckBrooklyn = $('#input-check-brooklyn');
var $inputCheckClarendon = $('#input-check-clarendon');
var $inputCheckGingham = $('#input-check-gingham');
var $inputCheckInkwell = $('#input-check-inkwell');
var $inputCheckKelvin = $('#input-check-kelvin');
var $inputCheckLark = $('#input-check-lark');
var $inputCheckLofi = $('#input-check-lofi');
var $inputCheckMoon = $('#input-check-moon');
var $inputCheckNashville = $('#input-check-nashville');
var $inputCheckPerpetua = $('#input-check-perpetua');
var $inputCheckToaster = $('#input-check-toaster');
var $inputCheckWalden = $('#input-check-walden');
var $inputCheckTint = $('#input-check-tint');
var $inputRangeTintOpacityValue = $('#input-range-tint-opacity-value');
var $inputCheckMultiply = $('#input-check-multiply');
var $inputCheckBlend = $('#input-check-blend');
var $inputCheckColorFilter = $('#input-check-color-filter');
var $inputRangeColorFilterValue = $('#input-range-color-filter-value');
var $instagramImage = $('#instagram-img');

// Sub menus
var $displayingSubMenu = $();
var $cropSubMenu = $('#crop-sub-menu');
var $flipSubMenu = $('#flip-sub-menu');
var $rotationSubMenu = $('#rotation-sub-menu');
var $freeDrawingSubMenu = $('#free-drawing-sub-menu');
var $drawLineSubMenu = $('#draw-line-sub-menu');
var $drawShapeSubMenu = $('#draw-shape-sub-menu');
var $textSubMenu = $('#text-sub-menu');
var $iconSubMenu = $('#icon-sub-menu');
var $filterSubMenu = $('#filter-sub-menu');
var $imageFilterSubMenu = $('#image-filter-sub-menu');

// Select line type
var $selectLine = $('[name="select-line-type"]');

// Select brush type
var $selectBrushType = $('[name="select-brush-type"]');

// Select shape type
var $selectShapeType = $('[name="select-shape-type"]');

// Select color of shape type
var $selectColorType = $('[name="select-color-type"]');

// Select blend type
var $selectBlendType = $('[name="select-blend-type"]');

// Image editor
var imageEditor = new tui.editor.ImageEditor('.tui-image-editor', {
    cssMaxWidth: 900,
    cssMaxHeight: 800,
    useItext: true,
    selectionStyle: {
        borderColor: '#ffffff',
        cornerColor: '#ffffff',
        cornerSize: 10,
        cornerStyle: 'circle',
        transparentCorners: false,
        rotatingPointOffset: 70,
        lineWidth: 1
    },
    applyCropSelectionStyle: true,
    applyStraightenGridStyle: true
});

// Color picker for free drawing
var brushColorpicker = tui.colorPicker.create({
    container: $('#tui-brush-color-picker')[0],
    color: '#000000'
});

// Color picker for text palette
var textColorpicker = tui.colorPicker.create({
    container: $('#tui-text-color-picker')[0],
    color: '#000000'
});

// Color picker for shape
var shapeColorpicker = tui.colorPicker.create({
    container: $('#tui-shape-color-picker')[0],
    color: '#000000'
});

// Color picker for icon
var iconColorpicker = tui.colorPicker.create({
    container: $('#tui-icon-color-picker')[0],
    color: '#000000'
});

var tintColorpicker = tui.colorPicker.create({
    container: $('#tui-tint-color-picker')[0],
    color: '#000000'
});

var multiplyColorpicker = tui.colorPicker.create({
    container: $('#tui-multiply-color-picker')[0],
    color: '#000000'
});

var blendColorpicker = tui.colorPicker.create({
    container: $('#tui-blend-color-picker')[0],
    color: '#00FF00'
});

// Common global functions
// HEX to RGBA
function hexToRGBa(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    var a = alpha || 1;

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function base64ToBlob(data) {
    var mimeString = '';
    var raw, uInt8Array, i, rawLength;

    raw = data.replace(rImageType, function (header, imageType) {
        mimeString = imageType;

        return '';
    });

    raw = atob(raw);
    rawLength = raw.length;
    uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

    for (i = 0; i < rawLength; i += 1) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: mimeString });
}

function resizeEditor() {
    var $editor = $('.tui-image-editor');
    var $container = $('.tui-image-editor-canvas-container');
    var height = parseFloat($container.css('max-height'));

    $editor.height(height);
}

function getBrushSettings() {
    var brushWidth = parseInt($inputBrushWidthRange.val(), 10);
    var brushColor = brushColorpicker.getColor();

    return {
        width: brushWidth,
        color: hexToRGBa(brushColor, 0.5)
    };
}

function activateShapeMode() {
    if (imageEditor.getDrawingMode() !== 'SHAPE') {
        imageEditor.stopDrawingMode();
        imageEditor.startDrawingMode('SHAPE');
    }
}

function activateIconMode() {
    if (imageEditor.getDrawingMode() !== 'ICON') {
        imageEditor.stopDrawingMode();
        imageEditor.startDrawingMode('ICON');
    }
}

function activateTextMode() {
    if (imageEditor.getDrawingMode() !== 'TEXT') {
        imageEditor.stopDrawingMode();
        imageEditor.startDrawingMode('TEXT');
    }
}

function setTextToolbar(obj) {
    var fontSize = obj.fontSize;
    var fontColor = obj.fill;

    $inputFontSizeRange.val(fontSize);
    textColorpicker.setColor(fontColor);
}

function setIconToolbar(obj) {
    var iconColor = obj.fill;

    iconColorpicker.setColor(iconColor);
}

function setShapeToolbar(obj) {
    var strokeColor, fillColor, isTransparent;
    var colorType = $selectColorType.val();

    if (colorType === 'stroke') {
        strokeColor = obj.stroke;
        isTransparent = (strokeColor === 'transparent');

        if (!isTransparent) {
            shapeColorpicker.setColor(strokeColor);
        }
    } else if (colorType === 'fill') {
        fillColor = obj.fill;
        isTransparent = (fillColor === 'transparent');

        if (!isTransparent) {
            shapeColorpicker.setColor(fillColor);
        }
    }

    $inputCheckTransparent.prop('checked', isTransparent);
    $inputStrokeWidthRange.val(obj.strokeWidth);
}

function showSubMenu(type) {
    var $submenu;

    switch (type) {
        case 'shape':
            $submenu = $drawShapeSubMenu;
            break;
        case 'icon':
            $submenu = $iconSubMenu;
            break;
        case 'text':
            $submenu = $textSubMenu;
            break;
        default:
            $submenu = 0;
    }

    $displayingSubMenu.hide();
    $displayingSubMenu = $submenu.show();
}

function applyOrRemoveFilter(applying, type, options, instagramFilter) {
    $instagramImage.removeClass();

    if (applying) {
        $instagramImage.addClass(instagramFilter || type);
        imageEditor.applyFilter(type, options).then(function (result) {
            console.log(result);
        });
    } else {
        imageEditor.removeFilter(type);
    }
}

// Attach image editor custom events
imageEditor.on({
    objectAdded: function (objectProps) {
        console.info(objectProps);
    },
    undoStackChanged: function (length) {
        if (length) {
            $btnUndo.removeClass('disabled');
        } else {
            $btnUndo.addClass('disabled');
        }
        resizeEditor();
    },
    redoStackChanged: function (length) {
        if (length) {
            $btnRedo.removeClass('disabled');
        } else {
            $btnRedo.addClass('disabled');
        }
        resizeEditor();
    },
    objectScaled: function (obj) {
        if (obj.type === 'text') {
            $inputFontSizeRange.val(obj.fontSize);
        }
    },
    addText: function (pos) {
        imageEditor.addText('Double Click', {
            position: pos.originPosition
        }).then(function (objectProps) {
            console.log(objectProps);
        });
    },
    objectActivated: function (obj) {
        activeObjectId = obj.id;
        if (obj.type === 'rect' || obj.type === 'circle' || obj.type === 'triangle') {
            showSubMenu('shape');
            setShapeToolbar(obj);
            activateShapeMode();
        } else if (obj.type === 'icon') {
            showSubMenu('icon');
            setIconToolbar(obj);
            activateIconMode();
        } else if (obj.type === 'text') {
            showSubMenu('text');
            setTextToolbar(obj);
            activateTextMode();
        }
    },
    mousedown: function (event, originPointer) {
        if ($imageFilterSubMenu.is(':visible') && imageEditor.hasFilter('colorFilter')) {
            imageEditor.applyFilter('colorFilter', {
                x: parseInt(originPointer.x, 10),
                y: parseInt(originPointer.y, 10)
            });
        }
    }
});

// Attach button click event listeners
$btns.on('click', function () {
    $btnsActivatable.removeClass('active');
});

$btnsActivatable.on('click', function () {
    $(this).addClass('active');
});

$btnUndo.on('click', function () {
    $displayingSubMenu.hide();

    if (!$(this).hasClass('disabled')) {
        imageEditor.undo();
    }
});

$btnRedo.on('click', function () {
    $displayingSubMenu.hide();

    if (!$(this).hasClass('disabled')) {
        imageEditor.redo();
    }
});

$btnClearObjects.on('click', function () {
    $displayingSubMenu.hide();
    imageEditor.clearObjects();
});

$btnRemoveActiveObject.on('click', function () {
    $displayingSubMenu.hide();
    imageEditor.removeObject(activeObjectId);
});

$btnCrop.on('click', function () {
    imageEditor.startDrawingMode('CROPPER');
    $displayingSubMenu.hide();
    $displayingSubMenu = $cropSubMenu.show();
    imageEditor.setCropzoneRect(2.5, false, 1);
});

$btnFlip.on('click', function () {
    console.log(imageEditor.getAngle());
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();
    $displayingSubMenu = $flipSubMenu.show();
});

$btnRotation.on('click', function () {
    $displayingSubMenu.hide();
    $displayingSubMenu = $rotationSubMenu.show();
});

$btnClose.on('click', function () {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();
});

$btnApplyCrop.on('click', function () {
    imageEditor.crop(imageEditor.getCropzoneRect()).then(function () {
        imageEditor.stopDrawingMode();
        resizeEditor();
    });
});

$btnCancelCrop.on('click', function () {
    imageEditor.stopDrawingMode();
});

$btnFlipX.on('click', function () {
    imageEditor.flipX().then(function (status) {
        console.log('flipX: ', status.flipX);
        console.log('flipY: ', status.flipY);
        console.log('angle: ', status.angle);
    });
});

$btnFlipY.on('click', function () {
    imageEditor.flipY().then(function (status) {
        console.log('flipX: ', status.flipX);
        console.log('flipY: ', status.flipY);
        console.log('angle: ', status.angle);
    });
});

$btnResetFlip.on('click', function () {
    imageEditor.resetFlip().then(function (status) {
        console.log('flipX: ', status.flipX);
        console.log('flipY: ', status.flipY);
        console.log('angle: ', status.angle);
    });
});

$btnRotateClockwise.on('click', function () {
    rotation = (Math.floor((rotation + 90) / 90) * 90) % 360;
    imageEditor.setAngle(rotation).then(() => {
        imageEditor.straighten(parseInt($inputStraightenRange.val(), 10), rotation)['catch'](function () { });
    });
});

$btnRotateCounterClockWise.on('click', function () {
    rotation = (Math.ceil((rotation - 90) / 90) * 90) % 360;
    imageEditor.setAngle(rotation).then(() => {
        imageEditor.straighten(parseInt($inputStraightenRange.val(), 10), rotation)['catch'](function () { });
    });
});

$inputRotationRange.on('mousedown', function () {
    var changeAngle = function () {
        rotation = parseInt($inputRotationRange.val(), 10);
        imageEditor.setAngle(rotation)['catch'](function () { });
    };
    $(document).on('mousemove', changeAngle);
    $(document).on('mouseup', function stopChangingAngle() {
        $(document).off('mousemove', changeAngle);
        $(document).off('mouseup', stopChangingAngle);
    });
});

$inputRotationRange.on('change', function () {
    rotation = parseInt($inputRotationRange.val(), 10);
    imageEditor.setAngle(rotation)['catch'](function () { });
});

$inputStraightenRange.on('mousedown', function () {
    imageEditor.startDrawingMode('STRAIGHTEN');

    var straighten = function () {
        imageEditor.straighten(parseInt($inputStraightenRange.val(), 10), rotation)['catch'](function () { });
    };
    $(document).on('mousemove', straighten);
    $(document).on('mouseup', function stopStraighten() {
        $(document).off('mousemove', straighten);
        $(document).off('mouseup', stopStraighten);
    });
});

$inputStraightenRange.on('mouseup', function () {
    imageEditor.startDrawingMode('LOCK');
});

$inputStraightenRange.on('change', function () {
    imageEditor.straighten(parseInt($inputStraightenRange.val(), 10), rotation)['catch'](function () { });
});

$inputBrushWidthRange.on('change', function () {
    imageEditor.setBrush({ width: parseInt(this.value, 10) });
});

$inputImage.on('change', function (event) {
    var file;

    if (!supportingFileAPI) {
        alert('This browser does not support file-api');
    }

    file = event.target.files[0];
    imageEditor.loadImageFromFile(file).then(function (result) {
        console.log(result);
        imageEditor.clearUndoStack();
    });
});

$btnDownload.on('click', function () {
    var imageName = imageEditor.getImageName();
    imageEditor.toBlob().then(blob => {
        var type = blob.type.split('/')[1];
        if (imageName.split('.').pop() !== type) {
            imageName += '.' + type;
        }

        // Library: FileSaver - saveAs
        saveAs(blob, imageName); // eslint-disable-line
    });
});

// control draw line mode
$btnDrawLine.on('click', function () {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();
    $displayingSubMenu = $drawLineSubMenu.show();
    $selectLine.eq(0).change();
});

$selectLine.on('change', function () {
    var mode = $(this).val();
    var settings = getBrushSettings();

    imageEditor.stopDrawingMode();
    if (mode === 'freeDrawing') {
        imageEditor.startDrawingMode('FREE_DRAWING', settings);
    } else {
        imageEditor.startDrawingMode('LINE_DRAWING', settings);
    }
});

$selectBrushType.on('change', function () {
    imageEditor.setBrush({
        brush: this.value
    });
});

brushColorpicker.on('selectColor', function (event) {
    imageEditor.setBrush({
        color: hexToRGBa(event.color, 0.5)
    });
});

// control draw shape mode
$btnDrawShape.on('click', function () {
    showSubMenu('shape');

    // step 1. get options to draw shape from toolbar
    shapeType = $('[name="select-shape-type"]:checked').val();

    shapeOptions.stroke = '#000000';
    shapeOptions.fill = '#ffffff';

    shapeOptions.strokeWidth = Number($inputStrokeWidthRange.val());

    // step 2. set options to draw shape
    imageEditor.setDrawingShape(shapeType, shapeOptions);

    // step 3. start drawing shape mode
    activateShapeMode();
});

$selectShapeType.on('change', function () {
    shapeType = $(this).val();

    imageEditor.setDrawingShape(shapeType);
});

$inputCheckTransparent.on('change', function () {
    var colorType = $selectColorType.val();
    var isTransparent = $(this).prop('checked');
    var color;

    if (!isTransparent) {
        color = shapeColorpicker.getColor();
    } else {
        color = 'transparent';
    }

    if (colorType === 'stroke') {
        imageEditor.changeShape(activeObjectId, {
            stroke: color
        });
    } else if (colorType === 'fill') {
        imageEditor.changeShape(activeObjectId, {
            fill: color
        });
    }

    imageEditor.setDrawingShape(shapeType, shapeOptions);
});

shapeColorpicker.on('selectColor', function (event) {
    var colorType = $selectColorType.val();
    var isTransparent = $inputCheckTransparent.prop('checked');
    var color = event.color;

    if (isTransparent) {
        return;
    }

    if (colorType === 'stroke') {
        imageEditor.changeShape(activeObjectId, {
            stroke: color
        });
    } else if (colorType === 'fill') {
        imageEditor.changeShape(activeObjectId, {
            fill: color
        });
    }

    imageEditor.setDrawingShape(shapeType, shapeOptions);
});

$inputStrokeWidthRange.on('change', function () {
    var strokeWidth = Number($(this).val());

    imageEditor.changeShape(activeObjectId, {
        strokeWidth: strokeWidth
    });

    imageEditor.setDrawingShape(shapeType, shapeOptions);
});

// control text mode
$btnText.on('click', function () {
    showSubMenu('text');
    activateTextMode();
});

$inputFontSizeRange.on('change', function () {
    imageEditor.changeTextStyle(activeObjectId, {
        fontSize: parseInt(this.value, 10)
    });
});

$btnTextStyle.on('click', function (e) { // eslint-disable-line
    var styleType = $(this).attr('data-style-type');
    var styleObj;

    e.stopPropagation();

    switch (styleType) {
        case 'b':
            styleObj = { fontWeight: 'bold' };
            break;
        case 'i':
            styleObj = { fontStyle: 'italic' };
            break;
        case 'u':
            styleObj = { underline: true };
            break;
        case 'l':
            styleObj = { textAlign: 'left' };
            break;
        case 'c':
            styleObj = { textAlign: 'center' };
            break;
        case 'r':
            styleObj = { textAlign: 'right' };
            break;
        default:
            styleObj = {};
    }

    imageEditor.changeTextStyle(activeObjectId, styleObj);
});

textColorpicker.on('selectColor', function (event) {
    imageEditor.changeTextStyle(activeObjectId, {
        'fill': event.color
    });
});

// control icon
$btnAddIcon.on('click', function () {
    showSubMenu('icon');
    activateIconMode();
});

function onClickIconSubMenu(event) {
    var element = event.target || event.srcElement;
    var iconType = $(element).attr('data-icon-type');
    imageEditor.registerUniformlyScaledIcons({ 'cancel': true });

    imageEditor.once('mousedown', function (e, originPointer) {
        imageEditor.addIcon(iconType, {
            left: originPointer.x,
            top: originPointer.y
        }).then(function (objectProps) {
            // console.log(objectProps);
        });
    });
}

$btnRegisterIcon.on('click', function () {
    $iconSubMenu.find('.menu-item').eq(3).after(
        '<li id="customArrow" class="menu-item icon-text" data-icon-type="customArrow">↑</li>'
    );

    imageEditor.registerIcons({
        customArrow: 'M 60 0 L 120 60 H 90 L 75 45 V 180 H 45 V 45 L 30 60 H 0 Z'
    });

    $btnRegisterIcon.off('click');

    $iconSubMenu.on('click', '#customArrow', onClickIconSubMenu);
});

$iconSubMenu.on('click', '.icon-text', onClickIconSubMenu);

iconColorpicker.on('selectColor', function (event) {
    imageEditor.changeIconColor(activeObjectId, event.color);
});

// control mask filter
$btnMaskFilter.on('click', function () {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();

    $displayingSubMenu = $filterSubMenu.show();
});

$btnImageFilter.on('click', function () {
    var filters = {
        'grayscale': $inputCheckGrayscale,
        'invert': $inputCheckInvert,
        'sepia': $inputCheckSepia,
        'blur': $inputCheckBlur,
        'shapren': $inputCheckSharpen,
        'emboss': $inputCheckEmboss,
        'removeWhite': $inputCheckRemoveWhite,
        'brightness': $inputCheckBrightness,
        'noise': $inputCheckNoise,
        'pixelate': $inputCheckPixelate,
        'tint': $inputCheckTint,
        'multiply': $inputCheckMultiply,
        'blend': $inputCheckBlend,
        'colorFilter': $inputCheckColorFilter
    };

    tui.util.forEach(filters, function ($value, key) {
        $value.prop('checked', imageEditor.hasFilter(key));
    });
    $displayingSubMenu.hide();

    $displayingSubMenu = $imageFilterSubMenu.show();
});

$btnLoadMaskImage.on('change', function () {
    var file;
    var imgUrl;

    if (!supportingFileAPI) {
        alert('This browser does not support file-api');
    }

    file = event.target.files[0];

    if (file) {
        imgUrl = URL.createObjectURL(file);

        imageEditor.loadImageFromURL(imageEditor.toDataURL(), 'FilterImage').then(function () {
            imageEditor.addImageObject(imgUrl).then(function (objectProps) {
                URL.revokeObjectURL(file);
                console.log(objectProps);
            });
        });
    }
});

$btnApplyMask.on('click', function () {
    imageEditor.applyFilter('mask', {
        maskObjId: activeObjectId
    }).then(function (result) {
        console.log(result);
    });
});

$inputCheckGrayscale.on('change', function () {
    applyOrRemoveFilter(this.checked, 'Grayscale', null);
});

$inputCheckInvert.on('change', function () {
    applyOrRemoveFilter(this.checked, 'Invert', null);
});

$inputCheckSepia.on('change', function () {
    applyOrRemoveFilter(this.checked, 'Sepia', null);
});

$inputCheckBlur.on('change', function () {
    applyOrRemoveFilter(this.checked, 'Blur', {
        blur: 1 / 9
    });
});

$inputCheckSharpen.on('change', function () {
    applyOrRemoveFilter(this.checked, 'Sharpen', null);
});

$inputCheckEmboss.on('change', function () {
    applyOrRemoveFilter(this.checked, 'Emboss', null);
});

$inputCheckRemoveWhite.on('change', function () {
    applyOrRemoveFilter(this.checked, 'removeWhite', {
        threshold: parseInt($inputRangeRemoveWhiteThreshold.val(), 10),
        distance: parseInt($inputRangeRemoveWhiteDistance.val(), 10)
    });
});

$inputRangeRemoveWhiteThreshold.on('change', function () {
    applyOrRemoveFilter($inputCheckRemoveWhite.is(':checked'), 'removeWhite', {
        threshold: parseInt(this.value, 10)
    });
});

$inputRangeRemoveWhiteDistance.on('change', function () {
    applyOrRemoveFilter($inputCheckRemoveWhite.is(':checked'), 'removeWhite', {
        distance: parseInt(this.value, 10)
    });
});

$inputCheckBrightness.on('change', function () {
    applyOrRemoveFilter(this.checked, 'brightness', {
        brightness: parseInt($inputRangeBrightnessValue.val(), 10) / 255
    });
});

$inputRangeBrightnessValue.on('change', function () {
    applyOrRemoveFilter($inputCheckBrightness.is(':checked'), 'brightness', {
        brightness: parseInt(this.value, 10) / 255
    });
});

$inputCheckNoise.on('change', function () {
    applyOrRemoveFilter(this.checked, 'noise', {
        noise: parseInt($inputRangeNoiseValue.val(), 10)
    });
});

$inputRangeNoiseValue.on('change', function () {
    applyOrRemoveFilter($inputCheckNoise.is(':checked'), 'noise', {
        noise: parseInt(this.value, 10)
    });
});

$inputCheckPixelate.on('change', function () {
    applyOrRemoveFilter(this.checked, 'pixelate', {
        blocksize: parseInt($inputRangePixelateValue.val(), 10)
    });
});

$inputRangePixelateValue.on('change', function () {
    applyOrRemoveFilter($inputCheckPixelate.is(':checked'), 'pixelate', {
        blocksize: parseInt(this.value, 10)
    });
});

$inputCheck1977.on('change', function () {
    applyOrRemoveFilter(this.checked, 'f1977', null, '_1977');
});

$inputCheckAmaro.on('change', function () {
    applyOrRemoveFilter(this.checked, 'amaro');
});

$inputCheckBrooklyn.on('change', function () {
    applyOrRemoveFilter(this.checked, 'brooklyn');
});

$inputCheckClarendon.on('change', function () {
    applyOrRemoveFilter(this.checked, 'clarendon');
});

$inputCheckGingham.on('change', function () {
    applyOrRemoveFilter(this.checked, 'gingham');
});

$inputCheckInkwell.on('change', function () {
    applyOrRemoveFilter(this.checked, 'inkwell');
});

$inputCheckKelvin.on('change', function () {
    applyOrRemoveFilter(this.checked, 'kelvin');
});

$inputCheckLark.on('change', function () {
    applyOrRemoveFilter(this.checked, 'lark');
});

$inputCheckLofi.on('change', function () {
    applyOrRemoveFilter(this.checked, 'lofi');
});

$inputCheckMoon.on('change', function () {
    applyOrRemoveFilter(this.checked, 'moon');
});

$inputCheckNashville.on('change', function () {
    applyOrRemoveFilter(this.checked, 'nashville');
});

$inputCheckPerpetua.on('change', function () {
    applyOrRemoveFilter(this.checked, 'perpetua');
});

$inputCheckToaster.on('change', function () {
    applyOrRemoveFilter(this.checked, 'toaster');
});

$inputCheckWalden.on('change', function () {
    applyOrRemoveFilter(this.checked, 'walden');
});

$inputCheckTint.on('change', function () {
    applyOrRemoveFilter(this.checked, 'tint', {
        color: tintColorpicker.getColor(),
        alpha: parseFloat($inputRangeTintOpacityValue.val())
    });
});

tintColorpicker.on('selectColor', function (e) {
    applyOrRemoveFilter($inputCheckTint.is(':checked'), 'tint', {
        color: e.color,
        alpha: parseFloat($inputRangeTintOpacityValue.val())
    });
});

$inputRangeTintOpacityValue.on('change', function () {
    applyOrRemoveFilter($inputCheckTint.is(':checked'), 'tint', {
        color: tintColorpicker.getColor(),
        alpha: parseFloat($inputRangeTintOpacityValue.val())
    });
});

$inputCheckMultiply.on('change', function () {
    applyOrRemoveFilter(this.checked, 'multiply', {
        color: multiplyColorpicker.getColor()
    });
});

multiplyColorpicker.on('selectColor', function () {
    applyOrRemoveFilter($inputCheckMultiply.is(':checked'), 'multiply', {
        color: e.color
    });
});

$inputCheckBlend.on('change', function () {
    applyOrRemoveFilter(this.checked, 'blendColor', {
        color: blendColorpicker.getColor(),
        mode: $selectBlendType.val()
    });
});

blendColorpicker.on('selectColor', function (e) {
    applyOrRemoveFilter($inputCheckBlend.is(':checked'), 'blendColor', {
        color: e.color
    });
});

$selectBlendType.on('change', function () {
    applyOrRemoveFilter($inputCheckBlend.is(':checked'), 'blendColor', {
        mode: this.value
    });
});

$inputCheckColorFilter.on('change', function () {
    applyOrRemoveFilter(this.checked, 'colorFilter', {
        color: '#FFFFFF',
        threshold: $inputRangeColorFilterValue.val()
    });
});

$inputRangeColorFilterValue.on('change', function () {
    applyOrRemoveFilter($inputCheckColorFilter.is(':checked'), 'colorFilter', {
        threshold: this.value
    });
});

// Etc..

// Load sample image
// imageEditor.loadImageFromURL('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'SampleImage').then(function(sizeValue) {
//     console.log(sizeValue);
//     imageEditor.clearUndoStack();
// });


// IE9 Unselectable
$('.menu').on('selectstart', function () {
    return false;
});
