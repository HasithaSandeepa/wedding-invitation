import Home from '@/app/page';
export const dynamic = 'force-dynamic';
export default function WeddingInvitation({ params }: { params: { token: string } }) {
  return <Home invitationToken={params.token} />;
}
