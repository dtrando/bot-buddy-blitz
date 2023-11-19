import { expect } from 'chai';
import { describe, it } from 'mocha';
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { SeedScene } from 'scenes';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { Object3D } from 'three';
import * as handlers from '../src/js/handlers.js';
import { initializeApp, resizeHandler } from '../src/app.js';

// Import the functions to be tested from app.js

describe('App', () => {
    describe('initializeApp', () => {
        it('should initialize the app components correctly', () => {
            // Arrange
            const scene = new SeedScene();
            const camera = new PerspectiveCamera();
            const renderer = new WebGLRenderer({ antialias: true });
            const cssRenderer = new CSS3DRenderer();
            const element = document.createElement('div');
            const object = new Object3D();

            // Act
            initializeApp(scene, camera, renderer, cssRenderer, element, object);

            // Assert
            expect(scene.children).to.include(object);
            expect(document.body.children).to.include(element);
        });
    });

    describe('resizeHandler', () => {
        it('should adjust the canvas size correctly', () => {
            // Arrange
            const renderer = new WebGLRenderer({ antialias: true });
            const canvas = renderer.domElement;
            const bodyStyle = document.body.style;

            // Act
            resizeHandler(renderer, canvas, bodyStyle);

            // Assert
            expect(canvas.style.display).to.equal('block');
            expect(bodyStyle.margin).to.equal('0');
            expect(bodyStyle.overflow).to.equal('hidden');
        });
    });

    describe('keypress event handlers', () => {
        it('should handle keydown event correctly', () => {
            // Arrange
            const keypress = {};
            const event = { key: 'ArrowUp' };

            // Act
            handlers.handleKeyDown(event, keypress);

            // Assert
            expect(keypress.ArrowUp).to.be.true;
        });

        it('should handle keyup event correctly', () => {
            // Arrange
            const keypress = {};
            const event = { key: 'ArrowUp' };

            // Act
            handlers.handleKeyUp(event, keypress);

            // Assert
            expect(keypress.ArrowUp).to.be.false;
        });
    });
});