"use client";

import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadBasic } from "@tsparticles/basic";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

// Phải khai báo ở module scope: ParticlesProvider yêu cầu init callback
// ổn định xuyên suốt vòng đời app, đặt trong component sẽ lỗi khi remount.
const particlesInit = async (engine: Engine): Promise<void> => {
  await loadBasic(engine);
};

function BackGroundParticles() {
  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      // Hiển thị full màn hình
      fullScreen: {
        enable: true,
        zIndex: -1, // Đẩy xuống dưới, làm background
      },
      // Màu nền
      background: {
        color: "#111", // nền đen (space)
      },
      // Giới hạn FPS để tối ưu hiệu năng
      fpsLimit: 60,
      particles: {
        // Số lượng hạt
        number: {
          value: 150, // tổng số sao
          density: {
            enable: true,
            // v4 đã bỏ `area`/`factor`, dùng `width`/`height`.
            // width 800 + height mặc định 1080 = đúng mật độ của `area: 800` ở v2.
            width: 800,
          },
        },
        // Màu của particles
        color: {
          value: "#ffffff", // sao trắng
        },
        // Hình dạng particles
        shape: {
          type: "circle", // hình tròn (sao nhỏ)
        },
        // Độ trong suốt
        opacity: {
          value: 0.8,
        },
        // Kích thước sao (random trong khoảng)
        size: {
          value: { min: 0.5, max: 2 },
        },
        // Cấu hình chuyển động
        move: {
          enable: true, // bật animation
          direction: "bottom", // rơi từ trên xuống (starfall)
          speed: {
            min: 0.2,
            max: 0.7, // tốc độ rơi chậm
          },
          straight: false, // di chuyển hơi ngẫu nhiên
          outModes: {
            default: "out", // ra khỏi màn hình thì biến mất
          },
        },
      },
      // Tối ưu cho màn hình retina
      detectRetina: true,
    }),
    [],
  );

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles id="BackGroundParticles" options={particlesOptions} />
    </ParticlesProvider>
  );
}

export default BackGroundParticles;
