namespace demosEgret {
    export class AnimationBaseTest extends BaseTest {
        public constructor() {
            super();

            this._resourceGroup = "animationBaseTest";
            this._resourceConfigURL = "resource/test.res.json";
        }

        private _armatureDisplay: dragonBones.EgretArmatureDisplay = null;

        protected _onStart(): void {
            dragonBones.EgretFactory.factory.parseDragonBonesData(RES.getRes(this._resourceGroup));
            dragonBones.EgretFactory.factory.parseTextureAtlasData(RES.getRes(this._resourceGroup + "_textureData"), RES.getRes(this._resourceGroup + "_texture"));

            this._armatureDisplay = dragonBones.EgretFactory.factory.buildArmatureDisplay("progressBar");
            this._armatureDisplay.x = this.stage.stageWidth * 0.5;
            this._armatureDisplay.y = this.stage.stageHeight * 0.5;
            this._armatureDisplay.scaleX = this._armatureDisplay.scaleY = this.stage.stageWidth >= 300 ? 1 : this.stage.stageWidth / 330;
            this.addChild(this._armatureDisplay);

            // Test animation event
            this._armatureDisplay.addEventListener(dragonBones.EventObject.START, this._animationEventHandler, this);
            this._armatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
            this._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
            this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN, this._animationEventHandler, this);
            this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
            this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT, this._animationEventHandler, this);
            this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);

            // Test frame event
            this._armatureDisplay.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._animationEventHandler, this);

            // Test animation config.
            let animaitonConfig = this._armatureDisplay.animation.animationConfig;
            animaitonConfig.name = "test"; // Animation state name.
            animaitonConfig.animationName = "idle"; // Animation name.

            animaitonConfig.playTimes = 1; // Play one time.
            //animaitonConfig.playTimes = 3; // Play several times.
            //animaitonConfig.playTimes = 0; // Loop play.

            //animaitonConfig.timeScale = 1.0; // Play speed.
            //animaitonConfig.timeScale = -1.0; // Reverse play.

            //animaitonConfig.position = 1.0; // Goto and play.
            //animaitonConfig.duration = 0.0; // Goto and stop.
            //animaitonConfig.duration = 3.0; // Interval play.

            this._armatureDisplay.animation.playConfig(animaitonConfig);
            //this._armatureDisplay.animation.stop();

            //            
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchHandler, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this._touchHandler, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchHandler, this);
        }

        private _touchHandler(event: egret.TouchEvent): void {
            const progress = Math.min(Math.max((event.stageX - this._armatureDisplay.x + 300 * this._armatureDisplay.scaleX) / 600 * this._armatureDisplay.scaleX, 0), 1);
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    // Play animation.
                    //this._armatureDisplay.animation.play("idle", 0);

                    // Play animation by time.
                    //this._armatureDisplay.animation.gotoAndPlayByTime("idle", 0.5, 1);
                    //this._armatureDisplay.animation.gotoAndStopByTime("idle", 1);

                    // Play animation by frame.
                    //this._armatureDisplay.animation.gotoAndPlayByFrame("idle", 25, 2);
                    //this._armatureDisplay.animation.gotoAndStopByFrame("idle", 50);

                    // Play animation by progress.
                    //this._armatureDisplay.animation.gotoAndPlayByProgress("idle", progress, 3);
                    this._armatureDisplay.animation.gotoAndStopByProgress("idle", progress);
                    break;

                case egret.TouchEvent.TOUCH_END:
                    this._armatureDisplay.animation.play();
                    break;

                case egret.TouchEvent.TOUCH_MOVE:
                    if (event.touchDown) {
                        const animationState = this._armatureDisplay.animation.getState("idle");
                        if (animationState){ 
                            animationState.currentTime = animationState.totalTime * progress;
                        }
                        //this._armatureDisplay.animation.gotoAndStopByProgress("idle", progress);
                    }
                    break;
            }
        }

        private _animationEventHandler(event: dragonBones.EgretEvent): void {
            console.log(event.eventObject.animationState.name, event.type, event.eventObject.name ? event.eventObject.name : "");
        }
    }
}