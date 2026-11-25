"use client";

import { useCallback, useRef, useState, type ChangeEvent } from "react";
import { Pause, Play, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  audioSrc?: string;
  durationText?: string;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function getAudioDuration(audio: HTMLAudioElement) {
  return Number.isFinite(audio.duration) ? audio.duration : 0;
}

export function AudioPlayer({
  audioSrc = "/audio/sample.mp3",
  durationText = "13:55",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const attachAudio = useCallback((audio: HTMLAudioElement | null) => {
    audioRef.current = audio;

    if (audio) setDuration(getAudioDuration(audio));
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const time = Number(event.currentTarget.value);

    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <section className="rounded-xl border border-accent-line bg-accent-soft p-3.5 sm:p-5">
      <div className="mb-3 flex items-center gap-2.5 sm:gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-accent">
          <Volume2 aria-hidden="true" className="size-5" />
        </span>
        <h2 className="text-sm font-bold text-accent sm:text-base">Âm thanh thuyết minh</h2>
      </div>

      <audio
        ref={attachAudio}
        src={audioSrc}
        preload="metadata"
        onDurationChange={(event) => setDuration(getAudioDuration(event.currentTarget))}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-2 rounded-xl border border-accent-line bg-surface px-2.5 py-2 sm:gap-3 sm:px-3">
        <button
          type="button"
          onClick={togglePlay}
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-accent text-white transition-colors duration-200 hover:bg-accent-hover"
          aria-label={isPlaying ? "Tạm dừng" : "Phát"}
        >
          {isPlaying ? (
            <Pause aria-hidden="true" className="size-4 fill-current" />
          ) : (
            <Play aria-hidden="true" className="ml-0.5 size-4 fill-current" />
          )}
        </button>

        <span className="shrink-0 text-xs font-medium text-muted tabular-nums">
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min={0}
          max={duration}
          step="any"
          value={currentTime}
          disabled={!duration}
          onChange={handleSeek}
          aria-label="Vị trí phát âm thanh"
          className="h-7 min-w-0 flex-1 cursor-pointer accent-accent disabled:cursor-default"
        />

        <span className="shrink-0 text-xs font-medium text-muted tabular-nums">
          {duration ? formatTime(duration) : durationText}
        </span>
      </div>
    </section>
  );
}
