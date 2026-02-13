import {
  CloseButton,
  Image,
  Overlay,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { createPortal } from 'react-dom';
import type { Launch } from '../../types/launch';

type PortalModalProps = {
  launch: Launch | null;
  onClose: () => void;
};

export const PortalModal: React.FC<PortalModalProps> = ({
  launch,
  onClose,
}) => {
  const portal = document.getElementById('portal');

  if (!launch || !portal) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Overlay color="#000" backgroundOpacity={0.7} onClick={onClose} role='overlay'/>
      <ScrollArea h={600}>
        <Paper
          shadow="xl"
          p="xl"
          radius="md"
          withBorder
          w="100%"
          style={{ zIndex: 1001, maxWidth: 900, position: 'relative' }}
        >
          <Stack>
            <div style={{ position: 'absolute', top: 10, right: 10 }}>
              <CloseButton onClick={onClose} size="lg" />
            </div>
            <Stack gap={5}>
              <Text fw={700}>{launch.mission_name}</Text>
              <Image
                src={launch.links?.mission_patch}
                height={200}
                alt="Mission icon"
                fit="contain"
              />
            </Stack>
            <Stack gap={5}>
              <Text fw={700}>Mission name:</Text>
              <Text fw={100}>{launch.mission_name}</Text>
            </Stack>
            <Stack gap={5}>
              <Text fw={700}>Rocket name:</Text>
              <Text fw={100}>{launch.rocket?.rocket_name}</Text>
            </Stack>
            <Stack gap={5}>
              <Text fw={700}>Details:</Text>
              <Text fw={100}>{launch.details}</Text>
            </Stack>
          </Stack>
        </Paper>
      </ScrollArea>
    </div>,
    portal
  );
};
