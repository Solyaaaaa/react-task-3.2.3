import { Button, Card, Image, Stack, Text } from '@mantine/core';
import type { Launch } from '../../types/launch';

type LaunchListProps = {
  currentLaunches: Launch[];
  onOpenModal: (launch: Launch) => void;
};

export const LaunchList: React.FC<LaunchListProps> = ({
  currentLaunches,
  onOpenModal,
}) => (
  <>
    {currentLaunches.map((launch) => {
      return (
        <Card
          key={launch.flight_number + launch.launch_date_unix}
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
          w={300}
          h={370}
        >
          <Card.Section>
            <Image
              src={launch.links?.mission_patch_small}
              height={180}
              alt="Mission icon"
              fit="contain"
              p={40}
            />
          </Card.Section>
          <Stack align="center" style={{ flexGrow: 1 }}>
            <Stack align="center" justify="center" gap="md">
              <Text fw={500} lineClamp={1}>
                {launch.mission_name}
              </Text>

              <Text size="sm" c="dimmed">
                {launch.rocket?.rocket_name}
              </Text>
            </Stack>
            <Button
              variant="filled"
              fullWidth
              radius="md"
              mt="auto"
              onClick={() => onOpenModal(launch)}
            >
              See more
            </Button>
          </Stack>
        </Card>
      );
    })}
  </>
);
