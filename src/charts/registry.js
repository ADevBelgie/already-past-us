// Maps <!-- CHART: id | ... --> placeholders in the manuscript to components.
// null = intentionally not rendered (the manuscript text or table carries it).
import StatCards from './StatCards.jsx'
import ForecastDumbbell from './ForecastDumbbell.jsx'
import FrontierSnapshots from './FrontierSnapshots.jsx'
import MetrCurve from './MetrCurve.jsx'
import JaggedMap from './JaggedMap.jsx'
import RsiDashboard from './RsiDashboard.jsx'
import WeightsMatrix from './WeightsMatrix.jsx'
import SignpostStamp from './SignpostStamp.jsx'

export const CHARTS = {
  's0-cards': StatCards,
  's1-forecast-dumbbell': ForecastDumbbell,
  's2-frontier-snapshots': FrontierSnapshots,
  's2-cost-per-question': null, // optional; Epoch's per-question data is not verified locally
  's3-metr-curve': MetrCurve,
  's4-jagged-map': JaggedMap,
  's5-definitions': null, // the markdown table is the figure
  's6-rsi-dashboard': RsiDashboard,
  's7-weights-matrix': WeightsMatrix,
  's9-signposts': SignpostStamp,
}
