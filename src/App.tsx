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
import { LaunchList } from './components/LaunchList/LaunchList';
import { initialState, reducer } from './store/launchReducer';
import type { Launch } from './types/launch';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpenModal = (launch: Launch) =>
    dispatch({ type: 'openModal', payload: launch });
  const handleCloseModal = () => dispatch({ type: 'closeModal' });

  useEffect(() => {
    const controller = new AbortController();
    const fetchFunc = async () => {
      try {
        const response = await fetch(
          `https://api.spacexdata.com/v3/launches?launch_year=2020`,
          { signal: controller.signal }
        );
        const resJson = await response.json();

        dispatch({ type: 'set_launches', payload: resJson });
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Ошибка при загрузке: ', error.message);
        }
      }
    };
    fetchFunc();

    return () => controller.abort();
  }, []);

  return (
    <MantineProvider>
      <AppShell header={{ height: 70 }} padding="md" withBorder={false}>
        <AppShell.Header>
          <Container size="xl">
            <Flex justify="center" align="center" h="100%">
              <h1>SpaseX Launches 2020</h1>
            </Flex>
          </Container>
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
                  onOpenModal={handleOpenModal}
                />
              ) : (
                <Flex justify="center" w="100%">
                  <Loader color="blue" size="xl" type="dots" />
                </Flex>
              )}

              {state.modalOpen && (
                <PortalModal
                  launch={state.selectedLaunch}
                  onClose={handleCloseModal}
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
