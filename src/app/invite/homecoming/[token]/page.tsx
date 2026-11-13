import HomecomingInvitation from '@/components/HomecomingInvitation';
export const dynamic = 'force-dynamic';
export default function HomecomingPage({ params }: { params: { token: string } }) {
  return <HomecomingInvitation token={params.token} />;
}
