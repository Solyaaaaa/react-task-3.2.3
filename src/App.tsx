import { useEffect, useReducer } from 'react';
import {
  AppShell,
  Container,
  Flex,
  Loader,
  MantineProvider,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { PortalModal } from './components/PortalModal/PortalModal';
import type { Launch } from './types/launch';
import { LaunchList } from './components/LaunchList/LaunchList';

type State = {
  currentLaunches: Launch[] | null;
  modalOpen: boolean;
  selectedLaunch: Launch | null;
};
type Action =
  | { type: 'stateLaunch'; payload: Launch[] }
  | { type: 'openModal'; payload: Launch }
  | { type: 'closeModal' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'stateLaunch':
      return {
        ...state,
        currentLaunches: action.payload,
      };
    case 'openModal':
      return {
        ...state,
        modalOpen: true,
        selectedLaunch: action.payload,
      };
    case 'closeModal':
      return {
        ...state,
        modalOpen: false,
        selectedLaunch: null,
      };

    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, {
    currentLaunches: null,
    modalOpen: false,
    selectedLaunch: null,
  });
  useEffect(() => {
    const fetchFunc = async () => {
      const response = await fetch(
        `https://api.spacexdata.com/v3/launches?launch_year=2020`
      );
      const resJson = await response.json();

      dispatch({ type: 'stateLaunch', payload: resJson });
    };

    fetchFunc();
  }, []);

  return (
    <MantineProvider>
      <AppShell header={{ height: 70 }} padding="md" withBorder={false}>
        <AppShell.Header>
          <Flex justify="center" align="center" h="100%">
            <h1>SpaseX Launches 2020</h1>
          </Flex>
        </AppShell.Header>
        <AppShell.Main>
          <Container size="xl">
            <Flex
              gap="md"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              {state.currentLaunches ? (
                <LaunchList
                  currentLaunches={state.currentLaunches}
                  onOpenModal={(launch) =>
                    dispatch({ type: 'openModal', payload: launch })
                  }
                />
              ) : (
                <Loader />
              )}

              {state.modalOpen && (
                <PortalModal
                  launch={state.selectedLaunch}
                  onClose={() => dispatch({ type: 'closeModal' })}
                />
              )}
            </Flex>
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
