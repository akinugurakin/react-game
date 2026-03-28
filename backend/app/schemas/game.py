from datetime import datetime

from pydantic import BaseModel, Field


class GameSessionCreate(BaseModel):
    game_id: int
    score: int = Field(ge=0)
    correct_count: int = Field(ge=0)
    wrong_count: int = Field(ge=0)
    duration_seconds: int = Field(ge=0)


class GameSessionResponse(BaseModel):
    id: int
    user_id: int
    game_id: int
    score: int
    correct_count: int
    wrong_count: int
    duration_seconds: int
    completed_at: datetime

    model_config = {"from_attributes": True}


class LeaderboardEntry(BaseModel):
    username: str
    score: int
    correct_count: int
    duration_seconds: int
    completed_at: datetime
