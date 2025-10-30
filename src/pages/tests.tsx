import { useState } from 'react'
import TestRoutes from '../components/shared/TestRoutes'

const TestsPage = () => {
	const [testResult, setTestResult] = useState<any>(null)
	const [mistakes, setMistakes] = useState<any[]>([])

	return (
		<section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-10 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 transition-colors">
			<div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6 md:p-8">
				<h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-600">
					🧠 Test bo‘limi
				</h1>

				{/* Test komponenti */}
				<div className="w-full overflow-x-auto">
					<TestRoutes
						testResult={testResult}
						mistakes={mistakes}
						setTestResult={setTestResult}
						setMistakes={setMistakes}
					/>
				</div>

				{/* Agar test natijasi chiqsa, pastda ko‘rsatiladi */}
				{testResult && (
					<div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
						<p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
							Sizning natijangiz: {testResult.score} ball
						</p>
					</div>
				)}
			</div>
		</section>
	)
}

export default TestsPage
