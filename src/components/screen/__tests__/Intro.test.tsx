import React, { ReactElement } from 'react';
import { RenderResult, act, fireEvent, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Button from '../../shared/Button';
import Intro from '../Intro';
import { ThemeType } from '@dooboo-ui/native-theme';
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('[Intro] screen rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Intro {...props} />);
    testingLib = render(component);
  });

  it('should render outer component and snapshot matches', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });

  it('should render [Dark] theme', () => {
    component = createTestElement(<Intro {...props} />, ThemeType.DARK);
    testingLib = render(component);
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('[Intro] Interaction', () => {
  let testingLib: RenderResult;

  it('should navigate when button has clicked', () => {
    testingLib = render(component);

    act(() => {
      fireEvent.press(testingLib.getByTestId('btn-navigate'), 'click');
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('TextList');
  });

  it('should change theme when button has clicked', () => {
    testingLib = render(component);

    act(() => {
      fireEvent.press(testingLib.getByTestId('btn-theme'), 'click');
    });
  });
});
