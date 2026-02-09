/**
 * [.d.ts 파일의 의미]
 * .d.ts의 'd'는 Declaration(선언)을 의미합니다. 
 * 이 파일은 실제 로직(Javascript 코드)을 포함하지 않고, 
 * 해당 라이브러리의 구조가 어떻게 생겼는지 TypeScript에게 알려주는 '설계도' 역할을 합니다.
 * 
 * react-plotly.js는 기본적으로 타입 정의가 포함되어 있지 않은 라이브러리이기 때문에,
 * 프로젝트 내에서 에러 없이 사용하기 위해 직접 타입을 정의해준 것입니다.
 */

declare module 'react-plotly.js' {
    import { Component } from 'react';
    import { PlotData, Layout, Config } from 'plotly.js';

    // Plot 컴포넌트가 받아들일 수 있는 Props 정의
    export interface PlotParams {
        data: Partial<PlotData>[];       // 시각화할 데이터 배열
        layout: Partial<Layout>;         // 레이아웃 설정 (배경색, 마진 등)
        config?: Partial<Config>;        // 설정 파라미터 (도구모음 표시 여부 등)
        useResizeHandler?: boolean;      // 컨테이너 크기에 맞춰 자동 리사이징 여부
        className?: string;              // 스타일 클래스 명
        style?: React.CSSProperties;     // 인라인 스타일
        onInitialized?: (figure: Readonly<Figure>, graphDiv: Readonly<HTMLElement>) => void;
        onUpdate?: (figure: Readonly<Figure>, graphDiv: Readonly<HTMLElement>) => void;
        // ... 필요한 이벤트 핸들러 추가 가능
    }

    // 내부 상태를 나타내는 Figure 인터페이스
    export interface Figure {
        data: Partial<PlotData>[];
        layout: Partial<Layout>;
        frames: any[] | null;
    }

    /**
     * react-plotly.js 라이브러리의 기본 export인 Plot 클래스를 정의합니다.
     * 위에서 정의한 PlotParams를 Props로 사용하도록 상속받습니다.
     */
    export default class Plot extends Component<PlotParams> { }
}
