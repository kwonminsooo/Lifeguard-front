import type {
  EmergencyGuidance,
  HospitalRecommendationResponse,
} from "../types";

// 기존 mock 함수는 제거됨 - 실제 API 사용

// 응급상황 대처 가이드 API
export async function getEmergencyGuidance(
  emergencyText: string
): Promise<EmergencyGuidance> {
  // 개발 환경에서는 프록시를 사용하고, 프로덕션에서는 직접 URL 사용
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "";
  const endpoint = import.meta.env.DEV
    ? "/api/emergency/guidance" // 개발 환경: 프록시 사용
    : `${apiUrl}/api/emergency/guidance`; // 프로덕션: 직접 URL 사용

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emergency_text: emergencyText,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail ||
          `API 요청 실패: ${response.status} ${response.statusText}`
      );
    }

    const data: EmergencyGuidance = await response.json();
    return data;
  } catch (error) {
    console.error("응급 가이드 API 호출 실패:", error);
    throw error;
  }
}

// 병원 추천 API
export async function getHospitalRecommendations(
  emergencyText: string,
  userLocation: { lat: number; lon: number }
): Promise<HospitalRecommendationResponse> {
  // 개발 환경에서는 프록시를 사용하고, 프로덕션에서는 직접 URL 사용
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "";
  const endpoint = import.meta.env.DEV
    ? "/api/emergency/hospitals" // 개발 환경: 프록시 사용
    : `${apiUrl}/api/emergency/hospitals`; // 프로덕션: 직접 URL 사용

  try {
    console.log("병원 추천 API 호출:", endpoint);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emergency_text: emergencyText,
        user_location: {
          lat: userLocation.lat,
          lon: userLocation.lon,
        },
      }),
    });

    if (!response.ok) {
      let errorMessage = `API 요청 실패: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }

      if (response.status === 404) {
        errorMessage = `백엔드 서버를 찾을 수 없습니다 (404). 서버가 실행 중인지 확인해주세요. 엔드포인트: ${endpoint}`;
      }

      throw new Error(errorMessage);
    }

    const data: HospitalRecommendationResponse = await response.json();
    return data;
  } catch (error) {
    console.error("병원 추천 API 호출 실패:", error);
    throw error;
  }
}
