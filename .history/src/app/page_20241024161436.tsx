import dynamic from 'next/dynamic'

const WaterBillCalculator = dynamic(() => import('@/components/water-bill-calculator'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return (
    <div>
      <WaterBillCalculator />
    </div>
  )
}
