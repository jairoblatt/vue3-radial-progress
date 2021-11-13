import { mount } from "@vue/test-utils";
import RadialProgressBar from "../RadialProgressBar.vue";

describe("RadialProgressBar.vue", () => {
  function mountFunction(options = {}) {
    return mount(RadialProgressBar, { ...options });
  }

  it("Should mount the component", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
