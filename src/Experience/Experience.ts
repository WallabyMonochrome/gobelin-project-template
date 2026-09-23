import { AbstractExperience } from './AbstractExperience';
import BaseCube from './BaseCube';

export default class Experience extends AbstractExperience {
    private static instance: Experience | null = null;

    private constructor() {
        super();
    }
    
    static getInstance() {
        if (!Experience.instance) {
            Experience.instance = new Experience();
        }
        return Experience.instance;
    }

    async onSetupProject(projectFolder: any): Promise<void> {
        const cube = new BaseCube();
        this.addToScene(cube);
    }

    onRender(): void {
        // Custom render logic can be added here if needed
    }

    onStep(timeElapsed: number, totalTimeElapsed: number): void {
        // Custom step logic can be added here if needed
    }

    onResize(): void {
        // Custom resize logic can be added here if needed
    }
    
}
