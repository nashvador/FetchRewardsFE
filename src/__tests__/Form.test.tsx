import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";
import FormPage from "../components/Form";

describe("<FormPage />", () => {
    let container: HTMLElement | null;

    beforeEach(() => {
        container = render(<FormPage />).container;
      });
    
      afterEach(() => {
        container?.remove();
        container = null;
      });

    test("when the fetch operation is pending, check if loading works", () => {
        const loadingCircle = container?.querySelector('#loadingCircle')
        expect(loadingCircle).toBeInTheDocument()
    })  

} )