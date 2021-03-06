export declare interface IThemeConfig {
    'common.bisize.width'?: string;
    'common.bisize.height'?: string;
    'common.backgroundImage'?: string;
    'common.backgroundColor'?: string;
    'common.border'?: string;
    'header.backgroundImage'?: string;
    'header.backgroundColor'?: string;
    'header.border'?: string;
    'loadButton.backgroundColor'?: string;
    'loadButton.border'?: string;
    'loadButton.color'?: string;
    'loadButton.fontFamily'?: string;
    'loadButton.fontSize'?: string;
    'downloadButton.backgroundColor'?: string;
    'downloadButton.border'?: string;
    'downloadButton.color'?: string;
    'downloadButton.fontFamily'?: string;
    'downloadButton.fontSize'?: string;
    'menu.normalIcon.path'?: string;
    'menu.normalIcon.name'?: string;
    'menu.activeIcon.path'?: string;
    'menu.activeIcon.name'?: string;
    'menu.iconSize.width'?: string;
    'menu.iconSize.height'?: string;
    'submenu.backgroundColor'?: string;
    'submenu.partition.color'?: string;
    'submenu.normalIcon.path'?: string;
    'submenu.normalIcon.name'?: string;
    'submenu.activeIcon.path'?: string;
    'submenu.activeIcon.name'?: string;
    'submenu.iconSize.width'?: string;
    'submenu.iconSize.height'?: string;
    'submenu.normalLabel.color'?: string;
    'submenu.normalLabel.fontWeight'?: string;
    'submenu.activeLabel.color'?: string;
    'submenu.activeLabel.fontWeight'?: string;
    'checkbox.border'?: string;
    'checkbox.backgroundColor'?: string;
    'range.pointer.color'?: string;
    'range.bar.color'?: string;
    'range.subbar.color'?: string;
    'range.value.color'?: string;
    'range.value.fontWeight'?: string;
    'range.value.fontSize'?: string;
    'range.value.border'?: string;
    'range.value.backgroundColor'?: string;
    'range.title.color'?: string;
    'range.title.fontWeight'?: string;
    'colorpicker.button.border'?: string;
    'colorpicker.title.color'?: string;
}

export declare interface IIconInfo {
    [propName: string]: string;
}

export declare interface IUniformScalingInfo {
    [propName: string]: boolean;
}

export declare interface IIconOptions {
    fill?: string;
    left?: number;
    top?: number;
}

export declare interface IShapeOptions {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    width?: number;
    height?: number;
    rx?: number;
    ry?: number;
    left?: number;
    top?: number;
    isRegular?: boolean;
    shadow?: IShadowOptions;
}

export declare interface IGenerateTextOptions {
    styles?: ITextStyleConfig;
    position?: {
        x: number;
        y: number;
    };
}

export declare interface ITextStyleConfig {
    fill?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: string;
    lineHeight?: number;
    textAlign?: string;
    textDecoration?: string;
    shadow?: IShadowOptions;
    stroke?: string;
    strokeWidth?: number;
}

export declare interface IRectConfig {
    left: number;
    top: number;
    width: number;
    height: number;
}

export declare interface ICanvasSize {
    width: number;
    height: number;
}

export declare interface IBrushOptions {
    width: number;
    color: string;
}

export declare interface IPositionConfig {
    x: number;
    y: number;
    originX: string;
    originY: string;
}

export declare interface IShadowOptions {
    color?: string;
    blur?: number;
    offsetX?: number;
    offsetY?: number;
    affectStroke?: boolean;
}

export declare interface IExportOptions {
    multiplier?: number;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    format?: string;
    quality?: number;
}

export declare interface ILoadImageOptions {
    crossOrigin?: 'anonymous' | 'use-credentials' | null;
}

export declare interface IGraphicObjectProps {
    id?: number;
    type?: string;
    text?: string;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    scaleX?: number;
    scaleY?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: string;
    lineHeight?: number;
    textAlign?: string;
    textDecoration?: string;
    shadow?: IShadowOptions;
    opacity?: number;
}

export declare interface IIncludeUIOptions {
    loadImage?: {
        path: string;
        name: string;
    };
    theme?: IThemeConfig;
    menu?: string[];
    initMenu?: string;
    uiSize?: {
        width: string;
        height: string;
    };
    menuBarPosition?: string;
    usageStatistics?: boolean;
}

export declare interface ISelectionStyleConfig {
    cornerStyle?: string;
    cornerSize?: number;
    cornerColor?: string;
    cornerStrokeColor?: string;
    transparentCorners?: boolean;
    lineWidth?: number;
    borderColor?: string;
    rotatingPointOffset?: number;
}

export declare interface IGridStyleConfig {
    color?: string;
    hCellCount?: number;
    vCellCount?: number;
    withCircles?: boolean;
}

export declare interface IObjectProps { // icon, shape
    fill: string;
    height: number;
    id: number;
    left: number;
    opacity: number;
    stroke: string | null;
    strokeWidth: number | null;
    top: number;
    type: string;
    width: number;
}

export declare interface ITextObjectProps extends IObjectProps {
    fontFamily: string;
    fontSize: string;
    fontStyle: string;
    text: string;
    textAlign: string;
    textDecoration: string;
}

export declare interface IFilterResolveObject {
    type: string;
    action: string;
}

export declare interface ICropResolveObject {
    oldWidth: number;
    oldHeight: number;
    newWidth: number;
    newHeight: number;
}

export declare interface IFlipXYResolveObject {
    flipX: boolean;
    flipY: boolean;
    angle: number;
}

export declare interface IOptions {
    includeUI?: IIncludeUIOptions;
    cssMaxWidth?: number;
    cssMaxHeight?: number;
    silentCommands: string[];
    usageStatistics?: boolean;
    selectionStyle?: ISelectionStyleConfig;
    gridStyle?: IGridStyleConfig;
    applyCropSelectionStyle?: boolean;
    applyGroupSelectionStyle?: boolean;
    applyStraightenGridStyle?: boolean;
}

export declare interface IUIDimension {
    height?: string;
    width?: string;
}

export declare interface IImageDimension {
    oldHeight?: number;
    oldWidth?: number;
    newHeight?: number;
    newWidth?: number;
}

export declare interface IEditorSize {
    uiSize?: IUIDimension,
    imageSize?: IImageDimension
}

export declare interface UI {
    resizeEditor(dimension: IEditorSize): Promise<void>;
}

export declare class ImageEditor {
    constructor(wrapper: string | Element, options: IOptions);
    public ui: UI;

    public addIcon(type: string, options?: IIconOptions): Promise<IObjectProps>;
    public addImageObject(imgUrl: string): Promise<void>;
    public addShape(type: string, options?: IShapeOptions): Promise<IObjectProps>;
    public addText(text: string, options?: IGenerateTextOptions): Promise<ITextObjectProps>;
    public applyFilter(type: string, options?: {
        maskObjId: number
    }, isSilent?: boolean): Promise<IFilterResolveObject>;
    public changeCursor(cursorType: string): void;
    public changeIconColor(id: number, color: string): Promise<void>;
    public changeSelectableAll(selectable: boolean): void;
    public changeShape(id: number, options?: IShapeOptions, isSilent?: boolean): Promise<void>;
    public changeText(id: number, text?: string): Promise<void>;
    public changeTextStyle(id: number, styleObj: ITextStyleConfig, isSilent?: boolean): Promise<void>;
    public clearObjects(): Promise<void>;
    public clearRedoStack(): void;
    public clearUndoStack(): void;
    public crop(rect: IRectConfig): Promise<ICropResolveObject>;
    public deactivateAll(): void;
    public destroy(): void;
    public discardSelection(): void;
    public flipX(): Promise<IFlipXYResolveObject>;
    public flipY(): Promise<IFlipXYResolveObject>;
    public getCanvasSize(): ICanvasSize;
    public getCropzoneRect(): IRectConfig;
    public getDrawingMode(): string;
    public getImage(): any;
    public getImageName(): string;
    public getObjectPosition(id: number, originX: string, originY: string): ICanvasSize;
    public getObjectProperties(id: number, keys: string | string[] | IGraphicObjectProps): IGraphicObjectProps;
    public getStraightenedRect(): IRectConfig;
    public hasFilter(type: string): boolean;
    public getFilterOptions(type: string): any;
    public isEmptyRedoStack(): boolean;
    public isEmptyUndoStack(): boolean;
    public loadImageFromFile(imgFile: File, imageName?: string): Promise<ICropResolveObject>;
    public loadImageFromURL(url: string, imageName?: string, options?: ILoadImageOptions, silent?: boolean): Promise<ICropResolveObject>;
    public redo(): Promise<any>;
    public registerIcons(infos: IIconInfo): void;
    public registerUniformlyScaledIcons(infos: IUniformScalingInfo): void;
    public removeActiveObject(): void;
    public removeFilter(type?: string): Promise<IFilterResolveObject>;
    public removeObject(id: number): Promise<void>;
    public resetFlip(): Promise<IFlipXYResolveObject>;
    public resizeCanvasDimension(dimension: ICanvasSize): Promise<void>;
    public rotate(angle: number, isSilent?: boolean): Promise<number>;
    public straighten(angle: number, rotationAngle?: number, isSilent?: boolean): Promise<number>;
    public getAngle(): number;
    public setAngle(angle: number, isSilent?: boolean): Promise<number>;
    public setBrush(option: IBrushOptions): void;
    public setCropzoneRect(mode?: number, fixAspect?: boolean, sizeInPercent?: number): void;
    public updateCropzoneRect(aspectRatio?: number, fixAspect?: boolean, initialSizeInPercent?: number): void;
    public setDrawingShape(type: string, options?: IShapeOptions): void;
    public setObjectPosition(id: number, posInfo?: IPositionConfig): Promise<void>;
    public setObjectProperties(id: number, keyValue?: IGraphicObjectProps): Promise<void>;
    public setObjectPropertiesQuietly(id: number, keyValue?: IGraphicObjectProps): Promise<void>;
    public startDrawingMode(mode: string, option?: { width?: number, color?: string }): boolean;
    public stopDrawingMode(): void;
    public toDataURL(options?: IExportOptions): string;
    public toBlob(options?: IExportOptions): Promise<Blob>;
    public toPreview(aspectRatio: number, width: number): Promise<Blob>;
    public undo(): Promise<any>;
    public preventObjectDeletion(prevent: boolean): void;
    public on(eventName: string, handler: (...args: any[]) => void): void;
    public off(eventName: string): void;
}
