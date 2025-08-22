import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Icon from '@/components/ui/icon'

interface Match {
  id: string
  team1: string
  team2: string
  odds1: number
  oddsX: number
  odds2: number
  time: string
  status: 'live' | 'upcoming'
}

interface Bet {
  id: string
  match: string
  selection: string
  odds: number
  amount: number
  potentialWin: number
}

export default function Index() {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: '1',
      team1: 'Реал Мадрид',
      team2: 'Барселона',
      odds1: 2.15,
      oddsX: 3.40,
      odds2: 3.25,
      time: '19:00',
      status: 'upcoming'
    },
    {
      id: '2',
      team1: 'Манчестер Сити',
      team2: 'Ливерпуль',
      odds1: 1.85,
      oddsX: 3.60,
      odds2: 4.20,
      time: 'LIVE 75\'',
      status: 'live'
    },
    {
      id: '3',
      team1: 'ПСЖ',
      team2: 'Бавария',
      odds1: 2.80,
      oddsX: 3.10,
      odds2: 2.55,
      time: '21:45',
      status: 'upcoming'
    }
  ])

  const [activeBets, setActiveBets] = useState<Bet[]>([])
  const [betAmount, setBetAmount] = useState('')
  const [selectedBet, setSelectedBet] = useState<{matchId: string, selection: string, odds: number} | null>(null)

  // Симуляция обновления коэффициентов в реальном времени
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev => prev.map(match => ({
        ...match,
        odds1: +(match.odds1 + (Math.random() - 0.5) * 0.1).toFixed(2),
        oddsX: +(match.oddsX + (Math.random() - 0.5) * 0.1).toFixed(2),
        odds2: +(match.odds2 + (Math.random() - 0.5) * 0.1).toFixed(2)
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const placeBet = () => {
    if (!selectedBet || !betAmount) return

    const amount = parseFloat(betAmount)
    const newBet: Bet = {
      id: Date.now().toString(),
      match: matches.find(m => m.id === selectedBet.matchId)?.team1 + ' vs ' + matches.find(m => m.id === selectedBet.matchId)?.team2 || '',
      selection: selectedBet.selection,
      odds: selectedBet.odds,
      amount,
      potentialWin: amount * selectedBet.odds
    }

    setActiveBets(prev => [...prev, newBet])
    setBetAmount('')
    setSelectedBet(null)
  }

  const selectBet = (matchId: string, selection: string, odds: number) => {
    setSelectedBet({ matchId, selection, odds })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">BetTech</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">Спорт</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Live</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Статистика</a>
              <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                Войти
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ставки нового поколения
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Современная платформа с коэффициентами в реальном времени и продвинутой аналитикой
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3">
              <Icon name="Play" size={20} className="mr-2" />
              Начать делать ставки
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Icon name="BarChart3" size={20} className="mr-2" />
              Посмотреть статистику
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Matches */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Wifi" size={24} className="mr-2 text-red-400" />
                  Live матчи
                  <Badge className="ml-2 bg-red-500 text-white animate-pulse">В ПРЯМОМ ЭФИРЕ</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {matches.map(match => (
                  <div key={match.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-white">
                          <div className="font-semibold">{match.team1} vs {match.team2}</div>
                          <div className="text-sm text-white/60">{match.time}</div>
                        </div>
                        {match.status === 'live' && (
                          <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-purple-500 hover:border-purple-500 transition-all"
                        onClick={() => selectBet(match.id, match.team1, match.odds1)}
                      >
                        <div className="text-center">
                          <div className="text-xs opacity-60">П1</div>
                          <div className="font-semibold">{match.odds1}</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-purple-500 hover:border-purple-500 transition-all"
                        onClick={() => selectBet(match.id, 'Ничья', match.oddsX)}
                      >
                        <div className="text-center">
                          <div className="text-xs opacity-60">X</div>
                          <div className="font-semibold">{match.oddsX}</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-purple-500 hover:border-purple-500 transition-all"
                        onClick={() => selectBet(match.id, match.team2, match.odds2)}
                      >
                        <div className="text-center">
                          <div className="text-xs opacity-60">П2</div>
                          <div className="font-semibold">{match.odds2}</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Betting Panel */}
          <div className="space-y-6">
            {/* Bet Slip */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Receipt" size={20} className="mr-2" />
                  Купон ставок
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedBet ? (
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-3 border border-purple-400/50">
                      <div className="text-white font-medium">{selectedBet.selection}</div>
                      <div className="text-purple-300">Коэффициент: {selectedBet.odds}</div>
                    </div>
                    
                    <div>
                      <label className="text-white text-sm">Сумма ставки</label>
                      <Input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        placeholder="Введите сумму"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mt-1"
                      />
                    </div>
                    
                    {betAmount && (
                      <div className="bg-green-500/20 rounded-lg p-3 border border-green-500/50">
                        <div className="text-green-300 text-sm">Возможный выигрыш</div>
                        <div className="text-green-300 font-bold text-lg">
                          {(parseFloat(betAmount) * selectedBet.odds).toFixed(2)} ₽
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={placeBet}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                      disabled={!betAmount}
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Сделать ставку
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="MousePointer" size={48} className="mx-auto text-white/30 mb-4" />
                    <p className="text-white/60">Выберите исход для ставки</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Bets */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="History" size={20} className="mr-2" />
                  Активные ставки
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeBets.length > 0 ? (
                  <div className="space-y-3">
                    {activeBets.map(bet => (
                      <div key={bet.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="text-white text-sm font-medium">{bet.match}</div>
                        <div className="text-purple-300 text-sm">{bet.selection} • {bet.odds}</div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-white/60 text-xs">Ставка: {bet.amount} ₽</span>
                          <span className="text-green-300 text-xs font-semibold">+{bet.potentialWin.toFixed(2)} ₽</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Icon name="FileX" size={40} className="mx-auto text-white/30 mb-3" />
                    <p className="text-white/60 text-sm">Нет активных ставок</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="TrendingUp" size={20} className="mr-2" />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Всего ставок</span>
                    <span className="text-white font-semibold">{activeBets.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Потенциальный выигрыш</span>
                    <span className="text-green-300 font-semibold">
                      {activeBets.reduce((sum, bet) => sum + bet.potentialWin, 0).toFixed(2)} ₽
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Успешность</span>
                    <span className="text-purple-300 font-semibold">73%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}