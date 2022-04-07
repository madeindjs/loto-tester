/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { GameComputeWin, GameGraphData, Games } from "./models";
export namespace Components {
    interface AppBoule {
        "boule": boolean;
        "checked": boolean;
        "disabled": boolean;
        "extra": boolean;
        "number": number;
    }
    interface AppGameSelector {
        "value": Games;
    }
    interface AppLotoForm {
        "boules": number[];
        "extras": number[];
        "nbBoules": number;
        "nbExtras": number;
        "nbMaxBoules": number;
        "nbMaxExtras": number;
    }
    interface AppLotoSummary {
        "boules": number[];
        "extras": number[];
        "game": Games;
        "gameComputeWin": GameComputeWin;
        "nbMaxBoules": number;
        "nbMaxExtras": number;
    }
    interface AppLotoSummaryGraph {
        "points": GameGraphData[];
    }
    interface AppRoot {
    }
}
declare global {
    interface HTMLAppBouleElement extends Components.AppBoule, HTMLStencilElement {
    }
    var HTMLAppBouleElement: {
        prototype: HTMLAppBouleElement;
        new (): HTMLAppBouleElement;
    };
    interface HTMLAppGameSelectorElement extends Components.AppGameSelector, HTMLStencilElement {
    }
    var HTMLAppGameSelectorElement: {
        prototype: HTMLAppGameSelectorElement;
        new (): HTMLAppGameSelectorElement;
    };
    interface HTMLAppLotoFormElement extends Components.AppLotoForm, HTMLStencilElement {
    }
    var HTMLAppLotoFormElement: {
        prototype: HTMLAppLotoFormElement;
        new (): HTMLAppLotoFormElement;
    };
    interface HTMLAppLotoSummaryElement extends Components.AppLotoSummary, HTMLStencilElement {
    }
    var HTMLAppLotoSummaryElement: {
        prototype: HTMLAppLotoSummaryElement;
        new (): HTMLAppLotoSummaryElement;
    };
    interface HTMLAppLotoSummaryGraphElement extends Components.AppLotoSummaryGraph, HTMLStencilElement {
    }
    var HTMLAppLotoSummaryGraphElement: {
        prototype: HTMLAppLotoSummaryGraphElement;
        new (): HTMLAppLotoSummaryGraphElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLElementTagNameMap {
        "app-boule": HTMLAppBouleElement;
        "app-game-selector": HTMLAppGameSelectorElement;
        "app-loto-form": HTMLAppLotoFormElement;
        "app-loto-summary": HTMLAppLotoSummaryElement;
        "app-loto-summary-graph": HTMLAppLotoSummaryGraphElement;
        "app-root": HTMLAppRootElement;
    }
}
declare namespace LocalJSX {
    interface AppBoule {
        "boule"?: boolean;
        "checked"?: boolean;
        "disabled"?: boolean;
        "extra"?: boolean;
        "number"?: number;
        "onToggle"?: (event: CustomEvent<void>) => void;
    }
    interface AppGameSelector {
        "onUpdate"?: (event: CustomEvent<Games>) => void;
        "value"?: Games;
    }
    interface AppLotoForm {
        "boules"?: number[];
        "extras"?: number[];
        "nbBoules"?: number;
        "nbExtras"?: number;
        "nbMaxBoules"?: number;
        "nbMaxExtras"?: number;
        "onBoulesChange"?: (event: CustomEvent<number[]>) => void;
        "onExtrasChange"?: (event: CustomEvent<number[]>) => void;
    }
    interface AppLotoSummary {
        "boules"?: number[];
        "extras"?: number[];
        "game"?: Games;
        "gameComputeWin"?: GameComputeWin;
        "nbMaxBoules"?: number;
        "nbMaxExtras"?: number;
        "onBouleDelete"?: (event: CustomEvent<number>) => void;
        "onExtraDelete"?: (event: CustomEvent<number>) => void;
        "onTryNumbers"?: (event: CustomEvent<{ boules: number[]; extras: number[] }>) => void;
    }
    interface AppLotoSummaryGraph {
        "points"?: GameGraphData[];
    }
    interface AppRoot {
    }
    interface IntrinsicElements {
        "app-boule": AppBoule;
        "app-game-selector": AppGameSelector;
        "app-loto-form": AppLotoForm;
        "app-loto-summary": AppLotoSummary;
        "app-loto-summary-graph": AppLotoSummaryGraph;
        "app-root": AppRoot;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-boule": LocalJSX.AppBoule & JSXBase.HTMLAttributes<HTMLAppBouleElement>;
            "app-game-selector": LocalJSX.AppGameSelector & JSXBase.HTMLAttributes<HTMLAppGameSelectorElement>;
            "app-loto-form": LocalJSX.AppLotoForm & JSXBase.HTMLAttributes<HTMLAppLotoFormElement>;
            "app-loto-summary": LocalJSX.AppLotoSummary & JSXBase.HTMLAttributes<HTMLAppLotoSummaryElement>;
            "app-loto-summary-graph": LocalJSX.AppLotoSummaryGraph & JSXBase.HTMLAttributes<HTMLAppLotoSummaryGraphElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
        }
    }
}
