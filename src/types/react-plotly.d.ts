declare module 'react-plotly.js' {
    import { Component } from 'react';
    import { PlotData, Layout, Config } from 'plotly.js';

    export interface PlotParams {
        data: Partial<PlotData>[];
        layout: Partial<Layout>;
        config?: Partial<Config>;
        useResizeHandler?: boolean;
        className?: string;
        style?: React.CSSProperties;
        onInitialized?: (figure: Readonly<Figure>, graphDiv: Readonly<HTMLElement>) => void;
        onUpdate?: (figure: Readonly<Figure>, graphDiv: Readonly<HTMLElement>) => void;
        onPurge?: (figure: Readonly<Figure>, graphDiv: Readonly<HTMLElement>) => void;
        onError?: (err: Readonly<Error>) => void;
        onHover?: (event: Readonly<PlotlyHTMLElement>) => void;
        onUnhover?: (event: Readonly<PlotlyHTMLElement>) => void;
        onClick?: (event: Readonly<PlotlyHTMLElement>) => void;
        onSelected?: (event: Readonly<PlotSelectionEvent>) => void;
        onRelayout?: (event: Readonly<PlotRelayoutEvent>) => void;
        onRestyle?: (event: Readonly<PlotRestyleEvent>) => void;
        onRedraw?: () => void;
        onAnimated?: () => void;
        onAfterPlot?: () => void;
        onSunburstPlot?: (event: Readonly<PlotlyHTMLElement>) => void;
    }

    export interface Figure {
        data: Partial<PlotData>[];
        layout: Partial<Layout>;
        frames: any[] | null;
    }

    export interface PlotlyHTMLElement extends HTMLElement {
        on(event: string, callback: Function): void;
        removeListener(event: string, callback: Function): void;
    }

    export interface PlotSelectionEvent {
        points: any[];
        range?: {
            x: number[];
            y: number[];
        };
        lassoPoints?: {
            x: number[];
            y: number[];
        };
    }

    export interface PlotRelayoutEvent {
        [key: string]: any;
    }

    export interface PlotRestyleEvent extends Array<any> {
        0: any;
        1: number[];
    }

    export default class Plot extends Component<PlotParams> { }
}
