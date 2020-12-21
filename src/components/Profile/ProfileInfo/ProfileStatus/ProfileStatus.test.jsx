import ProfileStatus from "./ProfileStatus";
import {create} from "react-test-renderer"

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={"da"}/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("da");
    })

    test("span should be rendered", () => {
        const component = create(<ProfileStatus status={"it"}/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    })

    test("input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={"it"}/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    })

    test("span should contain correct status", () => {
        const component = create(<ProfileStatus status={"it"}/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it");
    })

    test("input should be displayed in editMode instead of span", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status={"it"} updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    })
})