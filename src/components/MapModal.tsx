import { useState, useEffect } from "react";

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
}

export default function MapModal({
  isOpen,
  onClose,
  onLocationSelect,
  initialLocation,
}: MapModalProps) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(
    initialLocation || null
  );
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // 위도/경도를 주소로 변환 (기본 형식만 반환)
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    return `위도: ${lat.toFixed(6)}, 경도: ${lng.toFixed(6)}`;
  };

  // 현재 위치 가져오기 (Geolocation API)
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("이 브라우저는 위치 서비스를 지원하지 않습니다.");
      return;
    }

    setIsLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log("Geolocation API로 위치 가져오기 성공:", { lat, lng });

        const location: Location = {
          latitude: lat,
          longitude: lng,
        };

        console.log("Location 객체 생성:", location);

        // 주소 변환
        try {
          const addr = await reverseGeocode(lat, lng);
          location.address = addr;
          setAddress(addr);
          console.log("주소 변환 완료:", addr);
        } catch (err) {
          console.error("주소 변환 실패:", err);
          location.address = `위도: ${lat.toFixed(6)}, 경도: ${lng.toFixed(6)}`;
          setAddress(location.address);
        }

        setCurrentLocation(location);
        setIsLoading(false);
        console.log("위치 상태 업데이트 완료:", location);
        console.log("현재 currentLocation 상태:", location);
      },
      (error) => {
        setIsLoading(false);
        console.error("위치 가져오기 오류:", error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError(
              "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setError("위치 정보를 사용할 수 없습니다.");
            break;
          case error.TIMEOUT:
            setError("위치 정보 요청 시간이 초과되었습니다.");
            break;
          default:
            setError("위치 정보를 가져오는 중 오류가 발생했습니다.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // 모달이 열릴 때 초기 위치가 있으면 설정
  useEffect(() => {
    if (isOpen && initialLocation) {
      setCurrentLocation(initialLocation);
      setAddress(initialLocation.address || "");
    }
  }, [isOpen, initialLocation]);

  const handleConfirm = () => {
    if (currentLocation) {
      onLocationSelect(currentLocation);
      onClose();
    } else {
      alert("위치를 선택해주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">위치 선택</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          {/* 현재 위치 가져오기 버튼 */}
          <button
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="w-full mb-4 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>위치 가져오는 중...</span>
              </>
            ) : (
              <>
                <span>📍</span>
                <span>현재 위치 가져오기</span>
              </>
            )}
          </button>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* 지도 영역 - 준비 중 메시지 */}
          {currentLocation && (
            <div
              className="flex-1 relative mb-4 flex items-center justify-center bg-gray-100 rounded-lg"
              style={{ minHeight: "400px" }}
            >
              <div className="text-center">
                <p className="text-gray-600">지도 기능 준비 중</p>
              </div>
            </div>
          )}

          {/* 위치 정보 표시 */}
          {currentLocation && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                선택한 위치
              </h3>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-gray-600 text-sm min-w-[80px]">
                    주소:
                  </span>
                  <span className="text-gray-800 font-medium flex-1">
                    {address || "주소 정보 없음"}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-gray-600 text-sm min-w-[80px]">
                    위도:
                  </span>
                  <span className="text-gray-800 font-mono text-sm">
                    {currentLocation.latitude.toFixed(6)}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-gray-600 text-sm min-w-[80px]">
                    경도:
                  </span>
                  <span className="text-gray-800 font-mono text-sm">
                    {currentLocation.longitude.toFixed(6)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              disabled={!currentLocation}
            >
              위치 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
