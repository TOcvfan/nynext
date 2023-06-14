import Image from 'next/image';
import billede from '../media/billede01.png';
import { Box } from '@mui/material';

export default function Home() {

  return (
    <Box>
      <Image src={billede} alt='billede' width={400} />
    </Box>

  )
}